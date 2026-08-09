import { prisma } from "../../db/prisma.ts";



function getWorkspaceById(workspaceId: number) {
    return prisma.workspace.findUnique({
        where: {
            id: workspaceId,
        },
    });
}

export { getWorkspaceById };

function getWorkspacesByUserId(userId: number) {
    return prisma.workspace.findMany({
        where: {
            user_id: userId,
        },
    });
}

export { getWorkspacesByUserId };