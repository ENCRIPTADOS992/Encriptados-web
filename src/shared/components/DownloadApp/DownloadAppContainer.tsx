"use client"

import { useEffect, useState } from "react"
import { DownloadAppButton } from "./DownloadAppButton"
import { DownloadAppModal } from "./DownloadAppModal"

const STORAGE_KEY_DAILY = "enc_download_app_modal_daily_seen"
const AUTO_OPEN_DELAY_MS = 1500

export function DownloadAppContainer() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        if (typeof window === "undefined") return

        try {
            const lastSeen = localStorage.getItem(STORAGE_KEY_DAILY)
            const lastSeenDate = lastSeen ? new Date(parseInt(lastSeen, 10)).toDateString() : null
            const todayDate = new Date().toDateString()

            if (lastSeenDate === todayDate) {
                return
            }

            const timer = window.setTimeout(() => {
                setIsModalOpen(true)
                localStorage.setItem(STORAGE_KEY_DAILY, Date.now().toString())
            }, AUTO_OPEN_DELAY_MS)

            return () => window.clearTimeout(timer)
        } catch {
            // If storage is unavailable, fail silently and keep the manual button.
        }
    }, [])

    return (
        <>
            <DownloadAppButton onClick={() => setIsModalOpen(true)} />
            <DownloadAppModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    )
}
