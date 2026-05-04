"use client"

import { API } from "@/config"
import axios from "axios"
import { useEffect, useState } from "react"

export interface Sync {
  id: string
  triggerId: string
  userId: number
  actions: {
    id: string
    syncId: string
    actionId: string
    sortingOrder: number
    type: {
      id: string
      name: string
      image: string
    }
  }[]
  trigger: {
    id: string
    syncId: string
    triggerId: string
    type: {
      id: string
      name: string
      image: string
    }
  }
}

export function useSync() {
  const [loading, setLoading] = useState(true)
  const [syncs, setSyncs] = useState<Sync[]>([])

  useEffect(() => {
    axios
      .get(`${API}/api/v1/sync`, {
        withCredentials: true,
      })
      .then((res) => {
        setSyncs(res.data.syncs)
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return { loading, syncs }
}
