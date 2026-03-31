"use client";

import { useRouter } from "next/navigation";
import ProjectTable from "./project-table";
import type { Project } from "../types";
import { deleteProjectById, duplicateProjectById, editProjectById } from "../actions";

export default function ProjectTableContainer({ projects }: { projects: Project[] }) {
  const router = useRouter();

  return (
    <ProjectTable
      projects={projects}
      onDeleteProject={async (id: string) => {
        await deleteProjectById(id);
        router.refresh();
      }}
      onUpdateProject={async (id: string, data: { title: string; description: string }) => {
        await editProjectById(id, data);
        router.refresh();
      }}
      onDuplicateProject={async (id: string) => {
        await duplicateProjectById(id);
        router.refresh();
      }}
    />
  );
}

