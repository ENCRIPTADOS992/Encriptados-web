"use client"

import { useState } from "react"
import { DownloadAppButton } from "./DownloadAppButton"
import { DownloadAppModal } from "./DownloadAppModal"

export function DownloadAppContainer() {
    const [isModalOpen, setIsModalOpen] = useState(false)

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
