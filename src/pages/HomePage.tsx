import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router";
import { getNotesRequest } from "../api/notes";
import { Note } from "../types-d";
import { useNotesStore } from "../store/notes";
import Loader from "../components/Loader";
import { useEffect } from "react";
import { NoteList } from "../components/NotesList";
import { isEqual } from "lodash";

const HomePage = () => {
  const { notes, setNotes } = useNotesStore();

  const {
    isLoading: isLoadingNotes,
    error: notesError,
    data: notesData = [],
  } = useQuery<Note[], Error>({
    queryKey: ["notes"],
    queryFn: getNotesRequest,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });

console.log(notesData)

  useEffect(() => {
    if (!isEqual(notesData, notes)) {
      setNotes(notesData);
    }
  },
  [notesData]);
 

  if (isLoadingNotes) return <Loader />;

  if (notesError)
    return (
      <div className="text-center text-2xl font-bold ">Ocurred a error</div>
    );

  return (
    <>
      <main className="flex flex-col items-center gap-3 justify-center h-auto w-full bg-[#c1d7ff] pt-10">
        <h1 className="flex flex-col text-center text-2xl font-bold text-primary-800 items-center justify-center">
          Task app by Saul
        </h1>

        <ul className="flex flex-row gap-6 items-center justify-center  bg-[#c1d7ff]">
          {" "}
          <main className="min-h-screen max-w-screen bg-white">
            <div className=" py-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-6 px-6">
                My notes
              </h1>
              <NoteList notes={notesData || []} />
            </div>
          </main>
        </ul>

        <p className="text-center text-xl max-w-[990px] pb-8 font-light text-primary-800">
          # Full Stack Implementation Exercise ## 1. Requirements / Intro You
          need to implement a simple web application that allows you to take
          notes, tag, and filter them. The development is divided into two
          phases: - **Phase 1**: Note creation - **Phase 2**: Tag application
          and filtering ### IMPORTANT CONSIDERATIONS: - Phase 1 is mandatory to
          pass this exercise, while Phase 2 will provide extra points if done. -
          Content should be persisted in a relational database by using an ORM -
          in-memory storage or mocks are not allowed.
        </p>

        <p className="text-center text-xl max-w-[990px] pb-8 font-light text-primary-800">
          ## 2. Deliverables To pass this exercise, in addition to the
          implementation, you must: - Upload the code to a private GitHub
          repository given by Ensolvers HR staff and use git properly. Both the
          frontend and the backend should be pushed to that repository, in
          folders named `backend` and `frontend` respectively. - Include a
          bash/zsh script allowing to run the app. Ideally, the app should start
          in a Linux/macOS environment just by running one command. This command
          should set up everything that is required to run the app, like setting
          up a DB schema, pre-creating any config file, etc. - Include a
          `README.md` file describing all the runtimes, engines, tools, etc.,
          required to run the app, with their concrete versions (e.g., npm
          18.17, etc).
        </p>

        <Outlet />
      </main>
    </>
  );
};

export default HomePage;
