"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useOrganization } from "@/hooks/useOrganizationProfile";
import { useTheme } from "@/contexts/ThemeContext";
import { useApp } from "@/contexts/AppContext";
import BaseButton from "@/components/BaseButton";
import Image from "next/image";
import UserCircleIcon from "@/public/static/images/supervised_user_circle.svg";
import UserCircleIconWhite from "@/public/static/images/supervised_user_circle_white.svg";
import WMBLogo from "@/public/static/images/wmb_logo.svg";
import SaveIcon from "@/public/static/images/save_as.svg";
import CancelIcon from "@/public/static/images/cancel.svg";
import CancelIconWhite from "@/public/static/images/cancel_white.svg";
import ReportIcon from "@/public/static/images/report.svg";
import ReportIconWhite from "@/public/static/images/report_white.svg";
import NeurologyIcon from "@/public/static/images/neurology.svg";
import EmojiIcon from "@/public/static/images/emoji_objects.svg";
import TargetIcon from "@/public/static/images/target.svg";
import CloseIcon from "@/public/static/images/close_mobile_menu_icon_light_mode.svg";
import CloseIconWhite from "@/public/static/images/close_mobile_menu_icon_dark_mode.svg";
import AddIcon from "@/public/static/images/add_dark.svg";
import AddIconWhite from "@/public/static/images/add.svg";
import WikimediaIcon from "@/public/static/images/wikimedia_logo_black.svg";
import AvatarIcon from "@/public/static/images/avatar.svg";
import { ContactsSection } from "../components/ContactsSection";
import NeurologyIconWhite from "@/public/static/images/neurology_white.svg";
import EmojiIconWhite from "@/public/static/images/emoji_objects_white.svg";
import TargetIconWhite from "@/public/static/images/target_white.svg";
import WikimediaIconWhite from "@/public/static/images/wikimedia_logo_white.svg";
import AddLinkIcon from "@/public/static/images/add_link.svg";
import ImagesModeIcon from "@/public/static/images/images_mode.svg";
import { Organization } from "@/types/organization";
import { Capacity } from "@/types/capacity";
import CapacitySelectionModal from "../../profile/edit/components/CapacitySelectionModal";
import { useCapacityDetails } from "@/hooks/useCapacityDetails";
import { useProject, useProjects } from "@/hooks/useProjects";
import { useDocument } from "@/hooks/useDocument";
import { Project } from "@/types/project";
import { Event } from "@/types/event";
import { useEvent, useEvents } from "@/hooks/useEvents";
import { useNews } from "@/hooks/useNews";
import { News } from "@/types/news";
import { Document } from "@/types/document";

export default function EditOrganizationProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user?.token;
  const { darkMode } = useTheme();
  const { isMobile } = useApp();

  const {
    organization,
    isLoading,
    error,
    updateOrganization,
    organizationId,
    isOrgManager,
  } = useOrganization(token);

  const {
    projects,
    isLoading: isProjectsLoading,
    error: projectsError,
  } = useProjects(organization?.tag_diff, token);

  const {
    events,
    isLoading: isEventsLoading,
    error: eventsError,
  } = useEvents((organization?.events || []) as unknown as Event[], token);

  const { news, loading, fetchNews, fetchSingleNews, createNews, deleteNews } =
    useNews(token);

  const {
    documents,
    loading: isDocumentsLoading,
    error: documentsError,
    createDocument,
    deleteDocument,
  } = useDocument(token);

  const projectId = 0; // temporary id for new projects

  const { createProject, updateProject, deleteProject } = useProject(
    projectId,
    token
  );

  const eventId = 0; // temporary id for new events

  const { createEvent, updateEvent, deleteEvent } = useEvent(eventId, token);

  const [formData, setFormData] = useState<Partial<Organization>>({
    display_name: "",
    profile_image: "",
    acronym: "",
    meta_page: "",
    mastodon: "",
    tag_diff: [],
    events: [],
    documents: [],
    home_project: "",
    type: 0,
    territory: [],
    managers: [],
    known_capacities: [],
    available_capacities: [],
    wanted_capacities: [],
  });

  const [eventsData, setEventsData] = useState<Event[]>([]);
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [documentsData, setDocumentsData] = useState<Document[]>([]);
  const [diffTagsData, setDiffTagsData] = useState<News[]>([]);

  useEffect(() => {
    if (organization) {
      setFormData({
        display_name: organization.display_name,
        profile_image: organization.profile_image,
        acronym: organization.acronym,
        meta_page: organization.meta_page,
        mastodon: organization.mastodon,
        tag_diff: organization.tag_diff,
        events: organization.events,
        documents: organization.documents,
        home_project: organization.home_project,
        type: organization.type,
        territory: organization.territory,
        managers: organization.managers,
        known_capacities: organization.known_capacities,
        available_capacities: organization.available_capacities,
        wanted_capacities: organization.wanted_capacities,
      });
    }
  }, [organization]);

  useEffect(() => {
    if (organization) {
      if (events && JSON.stringify(eventsData) !== JSON.stringify(events)) {
        setEventsData(events);
      }
      if (
        projects &&
        JSON.stringify(projectsData) !== JSON.stringify(projects)
      ) {
        setProjectsData(projects);
      }
      if (
        documents &&
        JSON.stringify(documentsData) !== JSON.stringify(documents)
      ) {
        setDocumentsData(documents);
      }
    }
  }, [organization, events, projects, documents]);

  const handleSubmit = async () => {
    try {
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      if (!organizationId) {
        console.error(
          "No organization ID found. User might not be a manager of any organization."
        );
        return;
      }

      const updateProjectPromises = projectsData
        .filter((project) => project.id !== 0) // filtra apenas projetos existentes
        .map(async (project) => {
          try {
            await updateProject(project.id, {
              display_name: project.display_name,
              profile_image: project.profile_image,
              url: project.url,
              description: project.description || "",
              related_skills: project.related_skills,
              organization: Number(organizationId),
            });

            return project.id;
          } catch (error) {
            console.error(`Error updating project ${project.id}:`, error);
            return project.id; // retorna o ID original em caso de erro
          }
        });

      const projectPromises = projectsData
        .filter((project) => project.id === 0) // filtra apenas novos projetos
        .map(async (project) => {
          try {
            const newProject = await createProject({
              display_name: project.display_name,
              profile_image: project.profile_image,
              url: project.url,
              description: project.description || "",
              creation_date: new Date().toISOString(),
              creator: Number(session?.user?.id),
              related_skills: [],
              organization: Number(organizationId),
            });
            console.log("Created project:", newProject); // Debug log
            if (!newProject || !newProject.id) {
              console.error("Invalid project response:", newProject);
              return null;
            }
            return newProject?.id;
          } catch (error) {
            console.error("Error creating project:", error);
            return null;
          }
        });

      const [updatedProjectIds, newProjectIds] = await Promise.all([
        Promise.all(updateProjectPromises),
        Promise.all(projectPromises),
      ]);

      const validNewProjectIds = newProjectIds.filter(
        (id): id is number => id !== null && id !== undefined
      );

      const allProjectIds = [...updatedProjectIds, ...validNewProjectIds];

      const updateEventPromises = eventsData
        .filter((event) => event.id !== 0)
        .map(async (event) => {
          console.log("Processing update for event:", event.id);
          try {
            await updateEvent(event.id, {
              name: event.name,
              image_url: event.image_url,
              url: event.url,
              organizations: [Number(organizationId)],
              time_begin: event.time_begin,
              time_end: event.time_end,
            });
            return event.id;
          } catch (error) {
            console.error(`Error updating event ${event.id}:`, error);
            return null;
          }
        });

      const eventPromises = eventsData
        .filter((event) => event.id === 0)
        .map(async (event) => {
          console.log("Processing creation for new event");
          try {
            const newEvent = await createEvent({
              name: event.name || "New Event",
              image_url: event.image_url,
              url: event.url.startsWith("http")
                ? event.url
                : `https://${event.url}`,
              organizations: [Number(organizationId)],
              time_begin: new Date().toISOString(),
              time_end: new Date().toISOString(),
              creator: Number(session?.user?.id),
              team: [],
              related_skills: [],
              type_of_location: "IN_PERSON",
              openstreetmap_id: event.openstreetmap_id || "",
              wikidata_qid: event.wikidata_qid || "",
            });
            console.log("Created event with ID:", newEvent?.id);
            return newEvent?.id || null;
          } catch (error) {
            console.error("Error creating event:", error);
            return null;
          }
        });

      const documentPromises = documentsData.map(async (document) => {
        await createDocument({ id: document.id, url: document.url });
      });

      console.log("Awaiting promises...");
      const [updatedEventIds, newEventIds] = await Promise.all([
        Promise.all(updateEventPromises || []),
        Promise.all(eventPromises || []),
        Promise.all(documentPromises || []),
      ]);

      console.log("Promise results:", { updatedEventIds, newEventIds });

      // Filtra IDs nulos e undefined
      const validUpdatedIds = updatedEventIds.filter(
        (id): id is number => id !== null && id !== undefined
      );
      const validNewIds = newEventIds.filter(
        (id): id is number => id !== null && id !== undefined
      );

      const allEventIds = [...validUpdatedIds, ...validNewIds];
      console.log("Final event IDs:", allEventIds);

      const updatedFormData = {
        ...formData,
        events: allEventIds,
        projects: allProjectIds,
      };

      console.log("updatedFormData", updatedFormData);

      await updateOrganization({
        ...updatedFormData,
        events: allEventIds,
        tag_diff: allProjectIds,
      });

      router.push(`/organization_profile/`);
    } catch (error) {
      console.error("Error processing event promises:", error);
    }
  };

  const handleDeleteProject = async (projectId: number) => {
    await deleteProject(projectId);
    setProjectsData((prev) => prev.filter((p) => p.id !== projectId));
  };

  const [organizationData, setOrganizationData] = useState({
    name: "Wiki Movimento Brasil",
    description: "Grupo de usuários Wiki Movimento Brasil",
    logo_url: "",
    report_link: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCapacityType, setCurrentCapacityType] = useState<
    "known" | "available" | "wanted"
  >("known");

  const handleAddCapacity = (type: "known" | "available" | "wanted") => {
    setCurrentCapacityType(type);
    setIsModalOpen(true);
  };

  const handleAddProject = () => {
    const newProject = {
      id: 0, // temporary id for new projects
      display_name: "",
      profile_image: "",
      description: "",
      url: "",
      creation_date: new Date().toISOString(),
      creator: Number(session?.user?.id),
      related_skills: [],
      organization: Number(organizationId),
    };

    setProjectsData((prev) => [...(prev || []), newProject]);
  };

  const handleRemoveProject = (index: number) => {
    setFormData((prev) => {
      const newProjects = [...(prev.tag_diff || [])];
      newProjects.splice(index, 1);
      return { ...prev, tag_diff: newProjects };
    });
  };

  const handleAddEvent = () => {
    const newEvent = {
      id: 0,
      name: "New Event",
      type_of_location: "virtual",
      url: "https://example.com",
      image_url: "https://commons.wikimedia.org/wiki/File:example.svg",
      time_begin: new Date().toISOString(),
      time_end: new Date().toISOString(),
      organization: Number(organizationId),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      creator: Number(session?.user?.id),
      team: [],
      description: "",
      related_skills: [],
      organizations: [],
      openstreetmap_id: "",
      wikidata_qid: "",
    };
    setEventsData((prev) => [...(prev || []), newEvent]);
  };

  const handleRemoveEvent = (index: number) => {
    setFormData((prev) => {
      const newEvents = [...(prev.events || [])];
      newEvents.splice(index, 1);
      return { ...prev, events: newEvents };
    });
  };

  const handleAddDiffTag = () => {
    console.log("handleAddDiffTag");
    const newTag = {
      id: 0,
      tag: "Add a diff tag",
    };
    setDiffTagsData((prev) => [...(prev || []), newTag]);
  };

  const handleRemoveLink = (index: number) => {
    setFormData((prev) => {
      const newDocuments = [...(prev.documents || [])];
      newDocuments.splice(index, 1);
      return { ...prev, documents: newDocuments };
    });
  };

  const handleCapacitySelect = (capacity: Capacity) => {
    setFormData((prev) => {
      const capacityField =
        `${currentCapacityType}_capacities` as keyof typeof prev;
      const currentCapacities = (prev[capacityField] as number[]) || [];

      if (!currentCapacities.includes(capacity.id)) {
        return {
          ...prev,
          [capacityField]: [...currentCapacities, capacity.id],
        };
      }
      return prev;
    });
  };
  /* 
  const handleEventInputChange = (
    index: number,
    field: "image" | "link",
    value: string
  ) => {
    setFormData((prev) => {
      const updatedEvents = [...(prev.events || [])];
      if (!updatedEvents[index]) {
        updatedEvents[index] = { image: "", link: "" };
      }
      updatedEvents[index][field] = value;

      return {
        ...prev,
        events: updatedEvents,
      };
    });
  };
 */
  const capacityIds = useMemo(
    () =>
      [
        ...(formData?.known_capacities || []),
        ...(formData?.available_capacities || []),
        ...(formData?.wanted_capacities || []),
      ].map((id) => Number(id)),
    [formData]
  );

  const { getCapacityName } = useCapacityDetails(capacityIds);

  const handleRemoveCapacity = (
    type: "known" | "available" | "wanted",
    index: number
  ) => {
    setFormData((prev) => {
      const capacityField = `${type}_capacities` as keyof typeof prev;
      const currentCapacities = [...((prev[capacityField] as number[]) || [])];
      currentCapacities.splice(index, 1);

      return {
        ...prev,
        [capacityField]: currentCapacities,
      };
    });
  };

  const handleAddDocument = () => {
    console.log("handleAddDocument");
    const newDocument: Document = {
      id: 0,
      url: "",
    };
    setDocumentsData((prev) => [...(prev || []), newDocument]);
  };

  if (!isOrgManager) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-center">
          You are not a manager of any organization. Please contact an
          administrator.
        </p>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div
        className={`relative w-full overflow-x-hidden min-h-screen ${
          darkMode ? "bg-[#053749] text-white" : "bg-white text-[#053749]"
        }`}
      >
        <section
          className={`w-full max-w-screen-xl mx-auto px-4 py-8 ${
            isMobile ? "mt-[80px]" : "mt-[64px]"
          }`}
        >
          <div className="flex flex-col gap-6 max-w-[600px] mx-auto">
            {/* Header */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-row justify-between gap-4 items-center">
                <div className="flex flex-col gap-2">
                  <h1
                    className={`font-[Montserrat] text-[16px] not-italic font-normal leading-[29px] ${
                      darkMode ? "text-white" : "text-[#053749]"
                    }`}
                  >
                    Welcome!
                  </h1>
                  <h2
                    className={`font-[Montserrat] text-[20px] not-italic font-extrabold leading-[normal] ${
                      darkMode ? "text-white" : "text-[#053749]"
                    }`}
                  >
                    {session?.user?.name}
                  </h2>
                </div>
                <Image
                  src={AvatarIcon}
                  alt="Avatar"
                  width={70}
                  height={70}
                  className="w-auto h-auto"
                />
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src={darkMode ? UserCircleIconWhite : UserCircleIcon}
                  alt="User circle icon"
                  width={32}
                  height={32}
                />
                <span
                  className={`text-start font-[Montserrat] text-[16px] font-extrabold ${
                    darkMode ? "text-white" : "text-[#053749]"
                  }`}
                >
                  {organizationData?.name}
                </span>
              </div>

              <p
                className={`font-[Montserrat] text-[12px] text-gray-600 ${
                  darkMode ? "text-white" : "text-[#053749]"
                }`}
              >
                {organizationData?.description}
              </p>

              {/* Logo Section */}
              <div className="w-full h-[78px] bg-[#EFEFEF] flex items-center justify-center">
                <div className="relative h-[51px] w-[127px]">
                  <Image
                    src={WMBLogo}
                    alt="Organization logo"
                    width={127}
                    height={51}
                    className="w-full rounded-lg object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Save/Cancel Buttons */}
              <div className="flex flex-col gap-[10px] mt-0">
                <BaseButton
                  onClick={handleSubmit}
                  label="Save organization"
                  customClass="w-full flex items-center px-[13px] py-[6px] pb-[6px] bg-[#851970] text-white rounded-md py-3 font-bold !mb-0"
                  imageUrl={SaveIcon}
                  imageAlt="Upload icon"
                  imageWidth={20}
                  imageHeight={20}
                />
                <BaseButton
                  onClick={() => router.back()}
                  label="Cancel edit"
                  customClass="flex border rounded-[4px] !mb-0 border-[1.5px] border-[solid] border-capx-dark-box-bg bg-[#FFF] items-center justify-between text-capx-dark-box-bg px-4 py-2 rounded-md font-[Montserrat] text-[14px] font-bold pb-[6px]"
                  imageUrl={darkMode ? CancelIconWhite : CancelIcon}
                  imageAlt="Cancel icon"
                  imageWidth={20}
                  imageHeight={20}
                />
              </div>
            </div>
            {/* Report of Activities Section */}
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative w-[20px] h-[20px]">
                  <Image
                    src={darkMode ? ReportIconWhite : ReportIcon}
                    alt="Report icon"
                    className="object-contain"
                  />
                </div>
                <h2 className={`font-[Montserrat] text-[14px] font-bold`}>
                  Report of activities
                </h2>
              </div>
              <input
                type="text"
                placeholder="Insert link"
                className={`w-full p-2 text-[12px] border rounded-md ${
                  darkMode
                    ? "bg-transparent border-white text-white placeholder-gray-400"
                    : "border-gray-300 text-gray-700"
                }`}
                value={organizationData.report_link || ""}
                onChange={(e) =>
                  setOrganizationData({
                    ...organizationData,
                    report_link: e.target.value,
                  })
                }
              />
              <p
                className={`text-[12px] ${
                  darkMode ? "text-white" : "text-[#053749]"
                } mt-1`}
              >
                Please provide a meta link to your report of activities.
              </p>
            </div>

            {/* Capacities Sections */}
            <div className="space-y-6">
              {/* Known Capacities */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="relative w-[20px] h-[20px]">
                    <Image
                      src={darkMode ? NeurologyIconWhite : NeurologyIcon}
                      alt="Neurology icon"
                      className="object-contain"
                    />
                  </div>
                  <h2
                    className={`font-[Montserrat] text-[14px] font-bold flex items-center gap-2 ${
                      darkMode ? "text-white" : "text-[#053749]"
                    }`}
                  >
                    Known capacities
                  </h2>
                </div>
                <div
                  className={`flex flex-wrap gap-2 rounded-[4px] ${
                    darkMode ? "bg-[#04222F]" : "bg-[#EFEFEF]"
                  } flex w-full px-[4px] py-[6px] items-start gap-[12px]`}
                >
                  {formData?.known_capacities?.map((capacity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 rounded-md"
                    >
                      <BaseButton
                        onClick={() => handleRemoveCapacity("known", index)}
                        label={getCapacityName(capacity)}
                        customClass="rounded-[4px] border-[1px] border-[solid] border-[var(--Links-light-link,#0070B9)] flex p-[4px] pb-[4px] justify-center items-center gap-[4px] font-[Montserrat] text-[12px] not-italic font-normal leading-[normal]"
                        imageUrl={CloseIcon}
                        imageAlt="Close icon"
                        imageWidth={16}
                        imageHeight={16}
                      />
                    </div>
                  ))}
                </div>

                <BaseButton
                  onClick={() => handleAddCapacity("known")}
                  label="Add capacities"
                  customClass={`rounded-[4px] mt-2 flex w-full px-[13px] py-[6px] pb-[6px] items-center gap-[116px] text-center font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] ${
                    darkMode
                      ? "text-[#053749] bg-[#EFEFEF]"
                      : "text-white bg-capx-dark-box-bg"
                  }`}
                  imageUrl={darkMode ? AddIcon : AddIconWhite}
                  imageAlt="Add icon"
                  imageWidth={20}
                  imageHeight={20}
                />
                <p
                  className={`text-[12px] ${
                    darkMode ? "text-white" : "text-[#053749]"
                  } mt-1`}
                >
                  Select skills you already have from the Capacity Directory.
                  Try to choose the most specific ones
                </p>
              </div>

              {/* Available Capacities */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="relative w-[20px] h-[20px]">
                    <Image
                      src={darkMode ? EmojiIconWhite : EmojiIcon}
                      alt="Emoji icon"
                      className="object-contain"
                    />
                  </div>
                  <h2
                    className={`font-[Montserrat] text-[14px] font-bold flex items-center gap-2 ${
                      darkMode ? "text-white" : "text-[#053749]"
                    }`}
                  >
                    Available capacities
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <div
                    className={`flex flex-wrap gap-2 mt-2 px-1 py-[6px] rounded-[4px] ${
                      darkMode
                        ? "text-white bg-[#04222F]"
                        : "text-[#053749] bg-transparent"
                    }`}
                  >
                    {formData?.available_capacities?.map((capacity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 rounded-md"
                      >
                        <BaseButton
                          onClick={() =>
                            handleRemoveCapacity("available", index)
                          }
                          label={getCapacityName(capacity)}
                          customClass="rounded-[4px] border-[1px] border-[solid] border-[#05A300] flex p-[4px] pb-[4px] justify-center items-center gap-[4px] font-[Montserrat] text-[12px] not-italic font-normal leading-[normal]"
                          imageUrl={CloseIcon}
                          imageAlt="Close icon"
                          imageWidth={16}
                          imageHeight={16}
                        />
                      </div>
                    ))}
                  </div>
                  <BaseButton
                    onClick={() => handleAddCapacity("available")}
                    label="Add capacities"
                    customClass={`rounded-[4px] mt-2 flex w-full px-[13px] py-[6px] pb-[6px] items-center gap-[116px] text-center font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] ${
                      darkMode
                        ? "text-[#053749] bg-[#EFEFEF]"
                        : "text-white bg-[#053749]"
                    }`}
                    imageUrl={darkMode ? AddIcon : AddIconWhite}
                    imageAlt="Add icon"
                    imageWidth={20}
                    imageHeight={20}
                  />
                  <p
                    className={`text-[12px] ${
                      darkMode ? "text-white" : "text-[#053749]"
                    } mt-1`}
                  >
                    Choose the skills you are available to share from your known
                    capacities
                  </p>
                </div>
              </div>

              {/* Wanted Capacities */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="relative w-[20px] h-[20px]">
                    <Image
                      src={darkMode ? TargetIconWhite : TargetIcon}
                      alt="Target icon"
                      className="object-contain"
                    />
                  </div>
                  <h2
                    className={`font-[Montserrat] text-[14px] font-bold flex items-center gap-2 ${
                      darkMode ? "text-white" : "text-[#053749]"
                    }`}
                  >
                    Wanted capacities
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <div
                    className={`flex flex-wrap gap-2 mt-2 px-1 py-[6px] rounded-[4px] ${
                      darkMode
                        ? "text-white bg-[#04222F]"
                        : "text-[#053749] bg-transparent"
                    }`}
                  >
                    {formData?.wanted_capacities?.map((capacity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 rounded-md"
                      >
                        <BaseButton
                          onClick={() => handleRemoveCapacity("wanted", index)}
                          label={getCapacityName(capacity)}
                          customClass="rounded-[4px] border-[1px] border-[solid] border-[#D43831] flex p-[4px] pb-[4px] justify-center items-center gap-[4px] font-[Montserrat] text-[12px] not-italic font-normal leading-[normal]"
                          imageUrl={CloseIcon}
                          imageAlt="Close icon"
                          imageWidth={16}
                          imageHeight={16}
                        />
                      </div>
                    ))}
                  </div>
                  <BaseButton
                    onClick={() => handleAddCapacity("wanted")}
                    label="Add capacities"
                    customClass={`rounded-[4px] mt-2 flex w-full px-[13px] py-[6px] pb-[6px] items-center gap-[116px] text-center font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] ${
                      darkMode
                        ? "text-[#053749] bg-[#EFEFEF]"
                        : "text-white bg-[#053749]"
                    }`}
                    imageUrl={darkMode ? AddIcon : AddIconWhite}
                    imageAlt="Add icon"
                    imageWidth={20}
                    imageHeight={20}
                  />
                  <p
                    className={`text-[12px] ${
                      darkMode ? "text-white" : "text-[#053749]"
                    } `}
                  >
                    Select skills you are willing to learn from the Capacity
                    Directory. Try to choose the most specific ones
                  </p>
                </div>
              </div>
            </div>

            {/* Projects Section */}
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative w-[20px] h-[20px]">
                  <Image
                    src={darkMode ? WikimediaIconWhite : WikimediaIcon}
                    alt="Project icon"
                    width={24}
                    height={24}
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>
                <h2
                  className={`font-[Montserrat] text-[14px] font-bold ${
                    darkMode ? "text-white" : "text-[#053749]"
                  }`}
                >
                  Main Projects
                </h2>
              </div>

              <div className="flex flex-col w-full gap-2 mb-2">
                {Array.isArray(projectsData) &&
                  projectsData?.map((project, index) => (
                    <div key={index} className="flex flex-row gap-2">
                      <div className="flex flex-row gap-2 w-1/2 items-center text-[12px] p-2 border rounded-md bg-transparent">
                        <input
                          type="text"
                          placeholder="Project Name"
                          className={`w-full bg-transparent border-none outline-none ${
                            darkMode
                              ? "text-white placeholder-gray-400"
                              : "text-[#829BA4] placeholder-[#829BA4]"
                          }`}
                          value={project.display_name || ""}
                          onChange={(e) => {
                            const newProjects = [...projectsData];
                            newProjects[index] = {
                              ...newProjects[index],
                              display_name: e.target.value,
                            };
                            setProjectsData(newProjects);
                          }}
                        />
                      </div>

                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 text-[12px] border rounded-md w-1/2 bg-transparent"
                      >
                        <Image
                          src={ImagesModeIcon}
                          alt="Project image icon"
                          width={16}
                          height={16}
                          className="opacity-50"
                        />
                        <input
                          type="text"
                          placeholder="Project Image"
                          className={`w-full bg-transparent border-none outline-none ${
                            darkMode
                              ? "text-white placeholder-gray-400"
                              : "text-[#829BA4] placeholder-[#829BA4]"
                          }`}
                          value={project.profile_image || ""}
                          onChange={(e) => {
                            const newProjects = [...projectsData];
                            newProjects[index] = {
                              ...newProjects[index],
                              profile_image: e.target.value,
                            };
                            setProjectsData(newProjects);
                          }}
                        />
                      </div>

                      <div className="flex items-center gap-2 p-2 text-[12px] border rounded-md w-1/2 bg-transparent">
                        <div className="relative w-[20px] h-[20px]">
                          <Image
                            src={AddLinkIcon}
                            alt="Add link icon"
                            className="object-contain"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Link of project"
                          className={`w-full bg-transparent border-none outline-none ${
                            darkMode
                              ? "text-white placeholder-gray-400"
                              : "text-[#829BA4] placeholder-[#829BA4]"
                          }`}
                          value={project.url || ""}
                          onChange={(e) => {
                            const newProjects = [...projectsData];
                            newProjects[index] = {
                              ...newProjects[index],
                              url: e.target.value,
                            };
                            setProjectsData(newProjects);
                          }}
                        />
                      </div>
                      <button onClick={() => handleDeleteProject(project.id)}>
                        <div className="relative w-[20px] h-[20px]">
                          <Image
                            src={darkMode ? CancelIconWhite : CancelIcon}
                            alt="Delete icon"
                            className="object-contain"
                          />
                        </div>
                      </button>
                    </div>
                  ))}
              </div>
              <div className="flex items-center gap-1 rounded-md">
                <BaseButton
                  onClick={handleAddProject}
                  label="Add more projects"
                  customClass={`w-full flex ${
                    darkMode
                      ? "bg-capx-light-box-bg text-[#04222F]"
                      : "bg-[#053749] text-white"
                  } rounded-md py-2 font-[Montserrat] text-[12px] not-italic font-extrabold leading-[normal] mb-0 pb-[6px] px-[13px] py-[6px] items-center gap-[4px]`}
                  imageUrl={darkMode ? AddIcon : AddIconWhite}
                  imageAlt="Add project"
                  imageWidth={20}
                  imageHeight={20}
                />
              </div>
              <p
                className={`text-[12px] ${
                  darkMode ? "text-white" : "text-[#053749]"
                } mt-1`}
              >
                Show the community what your organization is working on. Share
                up to four wikimedia links and their illustrative images&apos;
                links on commons.
              </p>
            </div>

            {/* Events Section */}
            <div className="">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative w-[20px] h-[20px]">
                  <Image
                    src={darkMode ? WikimediaIconWhite : WikimediaIcon}
                    alt="Event icon"
                    className="object-contain"
                  />
                </div>
                <h2
                  className={`font-[Montserrat] text-[14px] font-bold ${
                    darkMode ? "text-white" : "text-[#053749]"
                  }`}
                >
                  Events
                </h2>
              </div>
              <div className="flex flex-col w-full gap-2 mb-2">
                {Array.isArray(eventsData) &&
                  eventsData?.map((event, index) => (
                    <div key={index} className="flex flex-row gap-2">
                      <div className="flex flex-row gap-2 w-1/2 items-center text-[12px] p-2 border rounded-md bg-transparent">
                        <input
                          type="text"
                          placeholder="Event Name"
                          className={`w-full bg-transparent border-none outline-none ${
                            darkMode
                              ? "text-white placeholder-gray-400"
                              : "text-[#829BA4] placeholder-[#829BA4]"
                          }`}
                          value={event.name || ""}
                          onChange={(e) => {
                            const newEvents = [...eventsData];
                            newEvents[index] = {
                              ...newEvents[index],
                              name: e.target.value,
                            };
                            setEventsData(newEvents);
                          }}
                        />
                      </div>
                      <div className="flex flex-row gap-2 items-center p-2 text-[12px] border rounded-md w-1/2 bg-transparent">
                        <div className="relative w-[20px] h-[20px]">
                          <Image
                            src={ImagesModeIcon}
                            alt="Project image icon"
                            className="object-contain"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Event Image"
                          value={event.image_url || ""}
                          onChange={(e) => {
                            const newEvents = [...eventsData];
                            newEvents[index] = {
                              ...newEvents[index],
                              image_url: e.target.value,
                            };
                            setEventsData(newEvents);
                          }}
                          className={`w-full bg-transparent border-none outline-none ${
                            darkMode
                              ? "text-white placeholder-gray-400"
                              : "text-[#829BA4] placeholder-[#829BA4]"
                          }`}
                        />
                      </div>
                      <div className="flex items-center gap-2 p-2 text-[12px] border rounded-md w-1/2 bg-transparent">
                        <div className="relative w-[20px] h-[20px]">
                          <Image
                            src={AddLinkIcon}
                            alt="Add link icon"
                            className="object-contain"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Link of event"
                          value={event.url || ""}
                          onChange={(e) => {
                            const newEvents = [...eventsData];
                            newEvents[index] = {
                              ...newEvents[index],
                              url: e.target.value,
                            };
                            setEventsData(newEvents);
                          }}
                          className={`w-full bg-transparent border-none outline-none ${
                            darkMode
                              ? "text-white placeholder-gray-400"
                              : "text-[#829BA4] placeholder-[#829BA4]"
                          }`}
                        />
                      </div>
                    </div>
                  ))}
              </div>
              <BaseButton
                onClick={handleAddEvent}
                label="Add more events"
                customClass={`rounded-[4px] bg-capx-dark-box-bg flex w-full px-[13px] py-[6px] pb-[6px] items-center gap-[116px] text-center font-[Montserrat] text-[14px] md:text-[16px] not-italic font-extrabold leading-[normal] ${
                  darkMode
                    ? "text-capx-dark-box-bg bg-white"
                    : "text-white bg-capx-dark-box-bg"
                }`}
                imageUrl={darkMode ? AddIcon : AddIconWhite}
                imageAlt="Add icon"
                imageWidth={20}
                imageHeight={20}
              />
              <p
                className={`text-[12px] ${
                  darkMode ? "text-white" : "text-[#053749]"
                } mt-1`}
              >
                Display your organization main events. Share up to four
                wikimedia links and their illustrative images&apos; links on
                commons.
              </p>
            </div>

            {/* News Section */}
            <div className="">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative w-[20px] h-[20px]">
                  <Image
                    src={darkMode ? WikimediaIconWhite : WikimediaIcon}
                    alt="News icon"
                    className="object-contain"
                  />
                </div>
                <h2
                  className={`font-[Montserrat] text-[14px] font-bold ${
                    darkMode ? "text-white" : "text-[#053749]"
                  }`}
                >
                  News
                </h2>
              </div>

              <input
                type="text"
                placeholder="Add a Diff Tag"
                className="w-full p-2 text-[12px] text-[#829BA4] border border-white bg-transparent rounded-md mb-2"
              />

              <BaseButton
                onClick={handleAddDiffTag}
                label="Add more Diff tags"
                customClass={`rounded-[4px] bg-capx-dark-box-bg flex w-full px-[13px] py-[6px] pb-[6px] items-center gap-[116px] text-center font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] ${
                  darkMode
                    ? "text-capx-dark-box-bg bg-white"
                    : "text-white bg-capx-dark-box-bg"
                }`}
                imageUrl={darkMode ? AddIcon : AddIconWhite}
                imageAlt="Add icon"
                imageWidth={20}
                imageHeight={20}
              />
              <p
                className={`text-[12px] ${
                  darkMode ? "text-white" : "text-[#053749]"
                } mt-1`}
              >
                Enter Diff tags related to your organization.
              </p>
            </div>

            {/* Documents Section */}
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative w-[20px] h-[20px]">
                  <Image
                    src={darkMode ? WikimediaIconWhite : WikimediaIcon}
                    alt="Document icon"
                    className="object-contain"
                  />
                </div>
                <h2
                  className={`font-[Montserrat] text-[14px] font-bold ${
                    darkMode ? "text-white" : "text-[#053749]"
                  }`}
                >
                  Documents
                </h2>
              </div>

              <input
                type="text"
                placeholder="Insert link"
                className="w-full p-2 text-[12px] text-[#829BA4] border border-white bg-transparent rounded-md mb-2"
              />

              <BaseButton
                onClick={handleAddDocument}
                label="Add more links"
                customClass={`rounded-[4px] bg-capx-dark-box-bg flex w-full px-[13px] py-[6px] pb-[6px] items-center gap-[116px] text-center font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] ${
                  darkMode
                    ? "text-capx-dark-box-bg bg-white"
                    : "text-white bg-capx-dark-box-bg"
                }`}
                imageUrl={darkMode ? AddIcon : AddIconWhite}
                imageAlt="Add icon"
                imageWidth={20}
                imageHeight={20}
              />
              <p
                className={`text-[12px] ${
                  darkMode ? "text-white" : "text-[#053749]"
                } mt-1`}
              >
                You can share up to four links of your organization&apos;s
                documents from Wikimedia Commons.
              </p>
            </div>

            {/* Contacts Section */}
            <ContactsSection />
          </div>
        </section>
        <CapacitySelectionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSelect={handleCapacitySelect}
          title={`Select ${currentCapacityType} capacities`}
        />
      </div>
    );
  }
  return (
    <div
      className={`relative w-full overflow-x-hidden min-h-screen ${
        darkMode ? "bg-capx-dark-box-bg text-white" : "bg-white text-[#053749]"
      }`}
    >
      <section
        className={`w-full mx-auto px-8 py-8 ${
          isMobile ? "mt-[80px]" : "mt-[64px]"
        }`}
      >
        <div className="flex flex-col gap-6 mx-auto">
          {/* Header */}
          <div className="flex flex-row gap-12">
            {/* Logo Section */}
            <div className="w-1/2">
              <div className="rounded-[16px] h-full items-center justify-center flex bg-[#EFEFEF]">
                <div className="relative w-[300px] h-[165px]">
                  <Image
                    src={WMBLogo}
                    alt="Organization logo"
                    className="object-contain w-full rounded-lg"
                    priority
                  />
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <div className="relative w-[114px] h-[114px] mb-[24px]">
                <Image
                  src={AvatarIcon}
                  alt="Avatar"
                  className="object-contain w-full rounded-lg"
                />
              </div>
              <div
                className={`flex flex-col gap-2 text-[30px] mb-[24px] ${
                  darkMode ? "text-white" : "text-[#053749]"
                }`}
              >
                <h1
                  className={`font-[Montserrat] not-italic font-normal leading-[29px] ${
                    darkMode ? "text-white" : "text-[#053749]"
                  }`}
                >
                  Welcome!
                </h1>
                <h2
                  className={`font-[Montserrat] not-italic font-extrabold leading-[normal] ${
                    darkMode ? "text-white" : "text-[#053749]"
                  }`}
                >
                  {session?.user?.name}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative w-[42px] h-[42px]">
                  <Image
                    src={darkMode ? UserCircleIconWhite : UserCircleIcon}
                    alt="User circle icon"
                    className="object-contain"
                  />
                </div>

                <span
                  className={`text-start font-[Montserrat] text-[24px] font-extrabold ${
                    darkMode ? "text-white" : "text-[#053749]"
                  }`}
                >
                  {organizationData?.name}
                </span>
              </div>

              <p
                className={`font-[Montserrat] text-[20px] mt-3 mb-6 ${
                  darkMode ? "text-white" : "text-[#053749]"
                }`}
              >
                {organizationData?.description}
              </p>

              {/* Save/Cancel Buttons */}
              <div className="flex flex-col gap-4">
                <BaseButton
                  onClick={handleSubmit}
                  label="Save profile"
                  customClass="flex bg-[#851970] items-center justify-between text-white px-4 py-2 rounded-[8px] font-[Montserrat] text-[24px] font-bold !px-[32px] !py-[16px] !w-3/4 h-auto !mb-0"
                  imageUrl={SaveIcon}
                  imageAlt="Save icon"
                  imageWidth={32}
                  imageHeight={32}
                />
                <BaseButton
                  onClick={() => router.back()}
                  label="Cancel edit"
                  customClass="flex border rounded-[4px] border-[1.5px] border-[solid] border-capx-dark-box-bg bg-[#FFF] items-center justify-between text-capx-dark-box-bg !px-[32px] !py-[16px] rounded-[8px] font-[Montserrat] text-[24px] w-3/4 font-bold pb-[6px]"
                  imageUrl={CancelIcon}
                  imageAlt="Cancel icon"
                  imageWidth={32}
                  imageHeight={32}
                />
              </div>
            </div>
          </div>
          {/* Report of Activities Section */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-[48px] h-[48px]">
                <Image
                  src={darkMode ? ReportIconWhite : ReportIcon}
                  alt="Report icon"
                  className="object-contain"
                />
              </div>
              <h2
                className={`font-[Montserrat] text-[14px] md:text-[24px] font-bold`}
              >
                Report of activities
              </h2>
            </div>
            <input
              type="text"
              placeholder="Insert link"
              className={`w-full p-2 md:p-3 text-[24px] border rounded-md ${
                darkMode
                  ? "bg-transparent border-white text-white placeholder-gray-400"
                  : "border-gray-300 text-[#829BA4]"
              }`}
              value={formData.meta_page || ""}
              onChange={(e) =>
                setFormData({ ...formData, meta_page: e.target.value })
              }
            />
            <p
              className={`text-[20px] ${
                darkMode ? "text-white" : "text-[#053749]"
              } mt-1`}
            >
              Please provide a meta link to your report of activities.
            </p>
          </div>

          {/* Capacities Sections */}
          <div className="space-y-6 mt-8">
            {/* Known Capacities */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="relative w-[48px] h-[48px]">
                  <Image
                    src={darkMode ? NeurologyIconWhite : NeurologyIcon}
                    alt="Neurology icon"
                    className="object-contain"
                  />
                </div>
                <h2
                  className={`font-[Montserrat] text-[14px] md:text-[24px] font-bold flex items-center gap-2 ${
                    darkMode ? "text-white" : "text-[#053749]"
                  }`}
                >
                  Known capacities
                </h2>
              </div>
              <div
                className={`flex flex-wrap gap-2 mt-2 px-[12px] py-[24px] rounded-[16px] ${
                  darkMode
                    ? "text-white bg-[#04222F]"
                    : "text-[#053749] bg-transparent"
                }`}
              >
                {formData.known_capacities?.map((capacity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 rounded-md"
                  >
                    <BaseButton
                      onClick={() =>
                        handleRemoveCapacity(currentCapacityType, index)
                      }
                      label={getCapacityName(capacity)}
                      customClass={`rounded-[4px] border-[1px] border-[solid] border-[#0070B9] flex p-[4px] justify-center items-center gap-[4px] font-[Montserrat] text-[24px] not-italic font-normal leading-[normal]`}
                      imageUrl={darkMode ? CloseIconWhite : CloseIcon}
                      imageAlt="Close icon"
                      imageWidth={16}
                      imageHeight={16}
                    />
                  </div>
                ))}
              </div>

              <BaseButton
                onClick={() => handleAddCapacity("known")}
                label="Add capacities"
                customClass={`rounded-[8px] !w-fit mt-2 flex !px-[32px] !py-[16px] !pb-[16px] items-center gap-3 text-center font-[Montserrat] text-[24px] not-italic font-extrabold leading-[normal] ${
                  darkMode
                    ? "text-[#053749] bg-[#EFEFEF]"
                    : "text-white bg-capx-dark-box-bg"
                }`}
                imageUrl={darkMode ? AddIcon : AddIconWhite}
                imageAlt="Add icon"
                imageWidth={32}
                imageHeight={32}
              />
              <p
                className={`text-[20px] ${
                  darkMode ? "text-white" : "text-[#053749]"
                } mt-1`}
              >
                Select skills you already have from the Capacity Directory. Try
                to choose the most specific ones
              </p>
            </div>

            {/* Available Capacities */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="relative w-[48px] h-[48px]">
                  <Image
                    src={darkMode ? EmojiIconWhite : EmojiIcon}
                    alt="Emoji icon"
                    className="object-contain"
                  />
                </div>
                <h2
                  className={`font-[Montserrat] text-[14px] md:text-[24px] font-bold flex items-center gap-2 ${
                    darkMode ? "text-white" : "text-[#053749]"
                  }`}
                >
                  Available capacities
                </h2>
              </div>
              <div
                className={`flex flex-wrap gap-2 mt-2 px-[12px] py-[24px] rounded-[16px] ${
                  darkMode
                    ? "text-white bg-[#04222F]"
                    : "text-[#053749] bg-transparent"
                }`}
              >
                {formData.available_capacities?.map((capacity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 rounded-md"
                  >
                    <BaseButton
                      onClick={() =>
                        handleRemoveCapacity(currentCapacityType, index)
                      }
                      label={getCapacityName(capacity)}
                      customClass={`rounded-[4px] border-[1px] border-[solid] border-[#05A300] flex p-[4px] justify-center items-center gap-[4px] font-[Montserrat] text-[24px] not-italic font-normal leading-[normal]`}
                      imageUrl={darkMode ? CloseIconWhite : CloseIcon}
                      imageAlt="Close icon"
                      imageWidth={16}
                      imageHeight={16}
                    />
                  </div>
                ))}
              </div>

              <BaseButton
                onClick={() => handleAddCapacity("available")}
                label="Add capacities"
                customClass={`rounded-[8px] w-fit mt-2 flex !px-[32px] !py-[16px] !pb-[16px] items-center gap-3 text-center font-[Montserrat] text-[24px] not-italic font-extrabold leading-[normal] ${
                  darkMode
                    ? "text-[#053749] bg-[#EFEFEF]"
                    : "text-white bg-capx-dark-box-bg"
                }`}
                imageUrl={darkMode ? AddIcon : AddIconWhite}
                imageAlt="Add icon"
                imageWidth={32}
                imageHeight={32}
              />
              <p
                className={`text-[20px] ${
                  darkMode ? "text-white" : "text-[#053749]"
                } mt-1`}
              >
                Choose the skills you are available to share from your known
                capacities
              </p>
            </div>

            {/* Wanted Capacities */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="relative w-[48px] h-[48px]">
                  <Image
                    src={darkMode ? TargetIconWhite : TargetIcon}
                    alt="Target icon"
                    className="object-contain"
                  />
                </div>
                <h2
                  className={`font-[Montserrat] text-[14px] md:text-[24px] font-bold flex items-center gap-2 ${
                    darkMode ? "text-white" : "text-[#053749]"
                  }`}
                >
                  Wanted capacities
                </h2>
              </div>
              <div
                className={`flex flex-wrap gap-2 mt-2 px-[12px] py-[24px] rounded-[16px] ${
                  darkMode
                    ? "text-white bg-[#04222F]"
                    : "text-[#053749] bg-transparent"
                }`}
              >
                {formData.wanted_capacities?.map((capacity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 rounded-md"
                  >
                    <BaseButton
                      onClick={() =>
                        handleRemoveCapacity(currentCapacityType, index)
                      }
                      label={getCapacityName(capacity)}
                      customClass={`rounded-[4px] border-[1px] border-[solid] border-[#D43831] flex p-[4px] justify-center items-center gap-[4px] font-[Montserrat] text-[24px] not-italic font-normal leading-[normal]`}
                      imageUrl={darkMode ? CloseIconWhite : CloseIcon}
                      imageAlt="Close icon"
                      imageWidth={16}
                      imageHeight={16}
                    />
                  </div>
                ))}
              </div>

              <BaseButton
                onClick={() => handleAddCapacity("wanted")}
                label="Add capacities"
                customClass={`rounded-[8px] mt-2 flex w-fit !px-[32px] !py-[16px] !pb-[16px] items-center gap-3 text-center font-[Montserrat] text-[24px] not-italic font-extrabold leading-[normal] ${
                  darkMode
                    ? "text-[#053749] bg-[#EFEFEF]"
                    : "text-white bg-capx-dark-box-bg"
                }`}
                imageUrl={darkMode ? AddIcon : AddIconWhite}
                imageAlt="Add icon"
                imageWidth={32}
                imageHeight={32}
              />
              <p
                className={`text-[20px] ${
                  darkMode ? "text-white" : "text-[#053749]"
                } mt-1`}
              >
                Select skills you are willing to learn from the Capacity
                Directory. Try to choose the most specific ones
              </p>
            </div>
          </div>

          {/* Projects Section */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-[48px] h-[48px]">
                <Image
                  src={darkMode ? WikimediaIconWhite : WikimediaIcon}
                  alt="Project icon"
                  className="object-contain"
                />
              </div>
              <h2
                className={`font-[Montserrat] text-[24px] font-bold ${
                  darkMode ? "text-white" : "text-[#053749]"
                }`}
              >
                Main Projects
              </h2>
            </div>

            <div className="flex w-full gap-2 mb-2 flex-col">
              {Array.isArray(projectsData) &&
                projectsData?.map((project, index) => (
                  <div key={index} className="flex gap-2 p-2">
                    <div className="flex flex-row gap-2 w-1/2 items-center text-[24px] p-2 border rounded-md bg-transparent">
                      <input
                        type="text"
                        placeholder="Project Name"
                        className={`w-full bg-transparent border-none outline-none ${
                          darkMode
                            ? "text-white placeholder-gray-400"
                            : "text-[#829BA4] placeholder-[#829BA4]"
                        }`}
                        value={project.display_name || ""}
                        onChange={(e) => {
                          const newProjects = [...projectsData];
                          newProjects[index] = {
                            ...newProjects[index],
                            display_name: e.target.value,
                          };
                          setProjectsData(newProjects);
                        }}
                      />
                    </div>
                    <div className="flex items-center gap-2 p-2 text-[12px] border rounded-md w-1/2 bg-transparent">
                      <div className="relative w-[32px] h-[32px]">
                        <Image
                          src={ImagesModeIcon}
                          alt="Project image icon"
                          className="object-contain"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Project Image"
                        className={`w-full bg-transparent border-none outline-none text-[24px] ${
                          darkMode
                            ? "text-white placeholder-gray-400"
                            : "text-[#829BA4] placeholder-[#829BA4]"
                        }`}
                      />
                    </div>
                    <div className="flex items-center gap-2 p-2 text-[12px] border rounded-md w-1/2 bg-transparent">
                      <div className="relative w-[32px] h-[32px]">
                        <Image
                          src={AddLinkIcon}
                          alt="Add link icon"
                          className="object-contain"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Link of project"
                        className={`w-full bg-transparent border-none outline-none text-[24px] ${
                          darkMode
                            ? "text-white placeholder-gray-400"
                            : "text-[#829BA4] placeholder-[#829BA4]"
                        }`}
                      />
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex items-center gap-1 rounded-md">
              <BaseButton
                onClick={handleAddProject}
                label="Add projects"
                customClass={`rounded-[8px] mt-2 flex w-fit !px-[32px] !py-[16px] !pb-[16px] items-center gap-3 text-center font-[Montserrat] text-[24px] not-italic font-extrabold leading-[normal] ${
                  darkMode
                    ? "text-[#053749] bg-[#EFEFEF]"
                    : "text-white bg-capx-dark-box-bg"
                }`}
                imageUrl={darkMode ? AddIcon : AddIconWhite}
                imageAlt="Add icon"
                imageWidth={32}
                imageHeight={32}
              />
            </div>
            <p
              className={`text-[20px] ${
                darkMode ? "text-white" : "text-[#053749]"
              } mt-1`}
            >
              Show the community what your organization is working on. Share up
              to four wikimedia links and their illustrative images&apos; links
              on commons.
            </p>
          </div>

          {/* Events Section */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-[48px] h-[48px]">
                <Image
                  src={darkMode ? WikimediaIconWhite : WikimediaIcon}
                  alt="Event icon"
                  fill
                  className="object-contain"
                />
              </div>
              <h2
                className={`font-[Montserrat] text-[14px] md:text-[24px] font-bold ${
                  darkMode ? "text-white" : "text-[#053749]"
                }`}
              >
                Events
              </h2>
            </div>

            <div className="flex w-full flex-col mb-2 gap-2">
              {Array.isArray(eventsData) &&
                eventsData?.map((event, index) => (
                  <div key={index} className="flex gap-2 p-2">
                    <div className="flex flex-row gap-2 w-1/2 items-center text-[24px] p-2 border rounded-md bg-transparent">
                      <input
                        type="text"
                        placeholder="Event Name"
                        className={`w-full bg-transparent border-none outline-none ${
                          darkMode
                            ? "text-white placeholder-gray-400"
                            : "text-[#829BA4] placeholder-[#829BA4]"
                        }`}
                        value={event.name || ""}
                        onChange={(e) => {
                          const newEvents = [...eventsData];
                          newEvents[index] = {
                            ...newEvents[index],
                            name: e.target.value,
                          };
                          setEventsData(newEvents);
                        }}
                      />
                    </div>
                    <div className="flex items-center gap-2 p-2 text-[12px] md:text-[14px] border rounded-md w-1/2 bg-transparent">
                      <div className="relative w-[32px] h-[32px]">
                        <Image
                          src={ImagesModeIcon}
                          alt="Event image icon"
                          className="object-contain"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Event Image"
                        className={`w-full bg-transparent border-none outline-none text-[24px] ${
                          darkMode
                            ? "text-white placeholder-gray-400"
                            : "text-[#829BA4] placeholder-[#829BA4]"
                        }`}
                      />
                    </div>
                    <div className="flex items-center gap-2 p-2 text-[12px] md:text-[14px] border rounded-md w-1/2 bg-transparent">
                      <div className="relative w-[32px] h-[32px]">
                        <Image
                          src={AddLinkIcon}
                          alt="Add link icon"
                          className="object-contain"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Link of project"
                        className={`w-full bg-transparent border-none outline-none text-[24px] ${
                          darkMode
                            ? "text-white placeholder-gray-400"
                            : "text-[#829BA4] placeholder-[#829BA4]"
                        }`}
                      />
                    </div>
                  </div>
                ))}
            </div>

            <BaseButton
              onClick={handleAddEvent}
              label="Add events"
              customClass={`rounded-[8px] mt-2 flex w-fit !px-[32px] !py-[16px] !pb-[16px] items-center gap-3 text-center font-[Montserrat] text-[24px] not-italic font-extrabold leading-[normal] ${
                darkMode
                  ? "text-[#053749] bg-[#EFEFEF]"
                  : "text-white bg-capx-dark-box-bg"
              }`}
              imageUrl={darkMode ? AddIcon : AddIconWhite}
              imageAlt="Add icon"
              imageWidth={32}
              imageHeight={32}
            />
            <p
              className={`text-[20px] ${
                darkMode ? "text-white" : "text-[#053749]"
              } mt-1`}
            >
              Display your organization main events. Share up to four wikimedia
              links and their illustrative images&apos; links on commons.
            </p>
          </div>

          {/* News Section */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-[48px] h-[48px]">
                <Image
                  src={darkMode ? WikimediaIconWhite : WikimediaIcon}
                  alt="News icon"
                  className="object-contain"
                />
              </div>
              <h2
                className={`font-[Montserrat] text-[14px] md:text-[24px] font-bold ${
                  darkMode ? "text-white" : "text-[#053749]"
                }`}
              >
                News
              </h2>
            </div>

            <input
              type="text"
              placeholder="Add a Diff Tag"
              className={`w-full p-2 md:p-3 text-[24px] border rounded-md mb-2 ${
                darkMode
                  ? "bg-transparent border-white text-white placeholder-gray-400"
                  : "border-white text-[#829BA4] placeholder-[#829BA4]"
              }`}
            />

            <BaseButton
              onClick={handleAddDiffTag}
              label="Add Diff tags"
              customClass={`rounded-[8px] mt-2 flex w-fit !px-[32px] !py-[16px] !pb-[16px] items-center gap-3 text-center font-[Montserrat] text-[24px] not-italic font-extrabold leading-[normal] ${
                darkMode
                  ? "text-[#053749] bg-[#EFEFEF]"
                  : "text-white bg-capx-dark-box-bg"
              }`}
              imageUrl={darkMode ? AddIcon : AddIconWhite}
              imageAlt="Add icon"
              imageWidth={32}
              imageHeight={32}
            />
            <p
              className={`text-[20px] ${
                darkMode ? "text-white" : "text-[#053749]"
              } mt-1`}
            >
              Enter Diff tags related to your organization.
            </p>
          </div>

          {/* Documents Section */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-[48px] h-[48px]">
                <Image
                  src={darkMode ? WikimediaIconWhite : WikimediaIcon}
                  alt="Document icon"
                  className="object-contain"
                />
              </div>
              <h2
                className={`font-[Montserrat] text-[14px] md:text-[24px] font-bold ${
                  darkMode ? "text-white" : "text-[#053749]"
                }`}
              >
                Documents
              </h2>
            </div>

            <input
              type="text"
              placeholder="Insert link"
              className={`w-full p-2 md:p-3 text-[24px] border rounded-md mb-2 ${
                darkMode
                  ? "bg-transparent border-white text-white placeholder-gray-400"
                  : "border-white text-[#829BA4] placeholder-[#829BA4]"
              }`}
            />

            <BaseButton
              onClick={handleAddDocument}
              label="Add link"
              customClass={`rounded-[8px] mt-2 flex w-fit !px-[32px] !py-[16px] !pb-[16px] items-center gap-3 text-center font-[Montserrat] text-[24px] not-italic font-extrabold leading-[normal] ${
                darkMode
                  ? "text-[#053749] bg-[#EFEFEF]"
                  : "text-white bg-capx-dark-box-bg"
              }`}
              imageUrl={darkMode ? AddIcon : AddIconWhite}
              imageAlt="Add icon"
              imageWidth={32}
              imageHeight={32}
            />
            <p
              className={`text-[20px] ${
                darkMode ? "text-white" : "text-[#053749]"
              } mt-1`}
            >
              You can share up to four links of your organization&apos;s
              documents from Wikimedia Commons.
            </p>
          </div>

          {/* Contacts Section */}
          <ContactsSection />

          {/* Save/Cancel Buttons */}
          <div className="flex flex-row gap-2 mt-6 w-1/2">
            <BaseButton
              onClick={handleSubmit}
              label="Save profile"
              customClass="flex border w-1/2 rounded-[4px] border-[1.5px] border-[solid] border-capx-dark-box-bg bg-[#851970]  items-center justify-between text-white !px-[32px] !py-[16px] rounded-md font-[Montserrat] text-[24px] font-bold pb-[6px]"
              imageUrl={SaveIcon}
              imageAlt="Save icon"
              imageWidth={32}
              imageHeight={32}
            />
            <BaseButton
              onClick={() => router.back()}
              label="Cancel edit"
              customClass="flex border w-1/2 rounded-[4px] border-[1.5px] border-[solid] border-capx-dark-box-bg bg-[#FFF] items-center justify-between text-capx-dark-box-bg !px-[32px] !py-[16px] rounded-md font-[Montserrat] text-[24px] font-bold pb-[6px]"
              imageUrl={CancelIcon}
              imageAlt="Cancel icon"
              imageWidth={32}
              imageHeight={32}
            />
          </div>
        </div>
      </section>
      <CapacitySelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleCapacitySelect}
        title={`Select ${currentCapacityType} capacities`}
      />
    </div>
  );
}
