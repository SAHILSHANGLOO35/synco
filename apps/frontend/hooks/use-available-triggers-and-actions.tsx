"use client"

import { API } from "@/config"
import axios from "axios"
import { useEffect, useState } from "react"

export const useAvailableTriggersAndActions = () => {
  const [availableTriggers, setAvailableTriggers] = useState([])
  const [availableActions, setAvailableActions] = useState([])

  useEffect(() => {
    axios
      .get(`${API}/api/v1/trigger/available`, {
        withCredentials: true,
      })
      .then((t) => setAvailableTriggers(t.data.availableTriggers))

    axios
      .get(`${API}/api/v1/action/available`, {
        withCredentials: true,
      })
      .then((t) => setAvailableActions(t.data.availableActions))
  }, [])

  return {
    availableTriggers,
    availableActions,
  }
}
