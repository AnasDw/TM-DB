import React, { useState } from "react";
import { useAtom } from "jotai";
import { useResetAtom } from "jotai/utils";
import { useRouter } from "next/router";
import { projectDraftAtom, prototypeTestDraftAtom } from "../../../state/atoms";
import { Pages } from "../../../utils/routes";
import { CreateProjectDropdown } from "./CreateProjectDropdown";
import { ProjectNameModal } from "./ProjectNameModal";

export const CreateProjectControl = () => {
  const [isProjectNameModalOpen, setIsProjectNameModalOpen] = useState(false);

  const router = useRouter();
  const [projectDraft, setProjectDraft] = useAtom(projectDraftAtom);
  const resetPrototypeTestDraft = useResetAtom(prototypeTestDraftAtom);

  const redirectToCreationPage = () => {
    router.push(Pages.CREATE_PROJECT_PAGE);
  };

  const handleModalClose = () => {
    setIsProjectNameModalOpen(false);
  };

  const handleNameSubmitted = (name: string) => {
    setProjectDraft({
      ...projectDraft,
      name,
    });

    resetPrototypeTestDraft();

    redirectToCreationPage();
  };

  const onItemClick = () => {
    setIsProjectNameModalOpen(true);
  };

  return (
    <>
      <CreateProjectDropdown onItemClick={onItemClick} />
      <ProjectNameModal
        isOpen={isProjectNameModalOpen}
        onClose={handleModalClose}
        onSubmit={handleNameSubmitted}
      />
    </>
  );
};
