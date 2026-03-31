import AddNewButton from '@/modules/dashboard/components/add-new'
import AddRepo from '@/modules/dashboard/components/add-repo'
import React from 'react'
import EmptyState from '@/modules/dashboard/components/empty-state'
import { getAllPlaygroundForUser } from '@/modules/dashboard/actions'
import ProjectTableContainer from '@/modules/dashboard/components/project-table-container'
import type { Project } from '@/modules/dashboard/types'

const page = async() => {
    const playgrounds = await getAllPlaygroundForUser();
    const projects = playgrounds as unknown as Project[];
  return (
    <div className="w-full mx-auto max-w-7xl px-4 pt-2 pb-6">
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
        <AddNewButton />
        <AddRepo />
      </div>

      <div className='mt-6 w-full'>
      {
        projects && projects.length==0?(
          <EmptyState />
        ):(
          <ProjectTableContainer projects={projects || []} />
        )
      }
      </div>
    </div>
  )
}

export default page