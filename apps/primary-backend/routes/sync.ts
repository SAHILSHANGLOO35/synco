import { Router } from "express"
import { authMiddleware } from "../middlewares/middleware"
import { syncCreateSchema } from "../types"
import { prisma } from "db/client"

const router = Router()

router.post("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId
    const body = req.body

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      })
    }

    const result = syncCreateSchema.safeParse(req.body)

    if (!result.success) {
      return res.status(400).json({
        errors: result.error.issues.map((e) => ({
          field: e.path[0],
          message: e.message,
        })),
      })
    }

    const { actions, availableTriggerId, triggerMetadata } = result.data

    const sync = await prisma.$transaction(async (tx) => {
      // 1. Validate trigger exists
      const triggerExists = await tx.availableTrigger.findUnique({
        where: { id: availableTriggerId },
      })

      if (!triggerExists) {
        throw new Error("Invalid trigger")
      }

      // 2. Validate all actions exist
      const actionIds = actions.map((a) => a.availableActionId)

      const existingActions = await tx.availableAction.findMany({
        where: {
          id: {
            in: actionIds,
          },
        },
      })

      if (existingActions.length !== actionIds.length) {
        throw new Error("Invalid action(s)")
      }

      // 3. Create Sync
      const newSync = await tx.sync.create({
        data: {
          userId,
        },
      })

      // 4. Create Trigger
      await tx.trigger.create({
        data: {
          availableTriggerId,
          syncId: newSync.id,
          metadata: JSON.stringify(triggerMetadata ?? {}),
        },
      })

      // 5. Create Actions
      await tx.action.createMany({
        data: actions.map((action, index) => ({
          availableActionId: action.availableActionId,
          syncId: newSync.id,
          sortingOrder: index,
          metadata: JSON.stringify(action.actionMetadata ?? {}),
        })),
      })

      return newSync
    })

    return res.status(201).json({
      syncId: sync.id,
      message: "Sync created successfully",
    })
  } catch (err: any) {
    if (
      err.message === "Invalid trigger" ||
      err.message === "Invalid action(s)"
    ) {
      return res.status(400).json({
        message: err.message,
      })
    }

    return res.status(500).json({
      message: "Internal server error",
    })
  }
})

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      })
    }

    const syncs = await prisma.sync.findMany({
      where: { userId },
      include: {
        trigger: {
          include: {
            type: true,
          },
        },
        actions: {
          include: {
            type: true,
          },
          orderBy: {
            sortingOrder: "asc",
          },
        },
      },
    })

    return res.status(200).json({
      syncs,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: "Internal server error",
    })
  }
})

router.get("/:syncId", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId
    const { syncId } = req.params

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      })
    }

    const sync = await prisma.sync.findFirst({
      where: {
        id: syncId as string,
        userId,
      },
      include: {
        trigger: {
          include: {
            type: true,
          },
        },
        actions: {
          include: {
            type: true,
          },
          orderBy: {
            sortingOrder: "asc",
          },
        },
      },
    })

    if (!sync) {
      return res.status(404).json({
        message: "Sync not found",
      })
    }

    return res.status(200).json({
      sync,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: "Internal server error",
    })
  }
})

export default router
