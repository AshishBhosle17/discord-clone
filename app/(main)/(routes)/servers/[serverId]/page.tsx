import { ModeToggle } from '@/components/mode-toggle'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

const ServerPage = () => {
  return (
    <div>
      <UserButton afterSignOutUrl='/' />
      <ModeToggle />
    </div>
  )
}

export default ServerPage