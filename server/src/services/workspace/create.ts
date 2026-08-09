import { prisma } from "../../db/prisma.ts";

type CreateWorkspaceParams = {
  name: string;
  userId: number;
};

function createWorkspace(workspaceParam: CreateWorkspaceParams) {
    return prisma.workspace.create({
        data: {
            name: workspaceParam.name,
            user_id: workspaceParam.userId,
        },
    });
}

export { createWorkspace };