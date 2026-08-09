import { prisma } from "../../db/prisma.ts";

type DeleteWorkspaceParams = {
    workspaceId : number;
};

function deleteWorkspace(workspaceParam: DeleteWorkspaceParams) {
    return prisma.workspace.delete({
        where: {
            id: workspaceParam.workspaceId,
        },
    });
}

export { deleteWorkspace };