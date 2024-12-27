"use client";
import NextLink from "next/link";
import Image from "next/image";
import { Link } from "react-scroll";
import { useApp } from "@/contexts/AppContext";
import IconDarkMode from "@/public/static/images/dark_mode.svg";
import ArrowDropDownWhite from "@/public/static/images/arrow_drop_down_circle_white.svg";
import ArrowDropDownBlack from "@/public/static/images/arrow_drop_down_circle.svg";
import { useState } from "react";
import UserProfileIcon from "@/public/static/images/check_box_outline_blank.svg";
import OrgProfileIcon from "@/public/static/images/check_box.svg";

interface MenuItem {
  title: string;
  to?: string;
  active: boolean;
  image?: string;
  isDarkBg?: boolean;
  action?: () => void;
}

interface SubMenuItem {
  title: string;
  to?: string;
  image: string;
  action?: () => void;
}

interface MobileMenuLinksProps {
  session: any;
  pageContent: {
    [key: string]: string;
  };
  handleMenuStatus: () => void;
}

export default function MobileMenuLinks({
  session,
  pageContent,
  handleMenuStatus,
}: MobileMenuLinksProps) {
  const { darkMode, setDarkMode } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);

  const subMenuItems: SubMenuItem[] = [
    {
      title: "Organization Profile",
      to: "/organization-profile",
      image: OrgProfileIcon,
    },
    {
      title: "User Profile",
      to: "/user-profile",
      image: UserProfileIcon,
    },
  ];

  const menuDataLoggedIn: MenuItem[] = [
    { title: pageContent["navbar-link-home"], to: "/home", active: true },
    {
      title: pageContent["navbar-link-capacities"],
      to: "/capacities",
      active: true,
    },
    { title: pageContent["navbar-link-reports"], to: "/reports", active: true },
    {
      title: pageContent["navbar-link-dark-mode"],
      action: () => {
        setDarkMode(!darkMode);
      },
      active: true,
      image: IconDarkMode,
    },
    {
      title: pageContent["navbar-link-profiles"],
      to: "/profile",
      active: true,
      image: ArrowDropDownBlack,
      isDarkBg: true,
    },
  ];

  const handleProfileClick = () => {
    setIsExpanded(!isExpanded);
  };

  if (session) {
    return (
      <div className="flex flex-col items-start text-2xl mx-auto mt-8 mb-4">
        {menuDataLoggedIn.map((item, index) => {
          if (item.active) {
            if (item.isDarkBg) {
              return (
                <div
                  key={`mobile-menu-container-${index}`}
                  className="w-[95%] mx-[8px]"
                >
                  <button
                    onClick={handleProfileClick}
                    className={`flex items-center justify-between px-2 py-1 rounded-[4px] border border-[#053749] transition-all duration-300 w-[90%] ml-[16px] mr-[16px] ${
                      isExpanded ? "bg-[#053749]" : "hover:bg-[#053749]/10"
                    }`}
                  >
                    <span
                      className={`font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] ${
                        isExpanded ? "text-white" : "text-[#053749]"
                      }`}
                    >
                      {item.title}
                    </span>
                    {item.image && isExpanded && (
                      <Image
                        src={ArrowDropDownWhite}
                        alt="Profile menu icon"
                        width={24}
                        height={24}
                        className={`ml-4 transition-transform duration-300 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    )}
                    {item.image && !isExpanded && (
                      <Image
                        src={item.image}
                        alt="Profile menu icon"
                        width={24}
                        height={24}
                        className={`ml-4 transition-transform duration-300 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>
                  {isExpanded && (
                    <div className="flex flex-col rounded-b-[4px] border border-[#053749] border-t-0 ml-[16px] mr-[16px] border-t border-[#053749]">
                      {subMenuItems.map((subItem, subIndex) => (
                        <NextLink
                          key={`submenu-item-${subIndex}`}
                          href={subItem.to || ""}
                          onClick={handleMenuStatus}
                          className="flex items-center justify-between w-full px-2 py-3 text-[#053749] hover:bg-[#053749]/10 border-t border-[#053749] pt-2"
                        >
                          <span className="font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] ">
                            {subItem.title}
                          </span>
                          <Image
                            src={subItem.image}
                            alt={`${subItem.title} icon`}
                            width={24}
                            height={24}
                          />
                        </NextLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            if (item.action) {
              return (
                <button
                  key={`mobile-menu-link-${index}`}
                  onClick={() => {
                    item.action?.();
                    if (!item.image || item.image !== IconDarkMode) {
                      handleMenuStatus();
                    }
                  }}
                  className={`w-full cursor-pointer py-3 font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] pl-6 ${
                    darkMode ? "text-capx-light-bg" : "text-[#053749]"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    {item.title}
                    {item.image && (
                      <div className="px-8">
                        <Image
                          src={item.image}
                          alt="Menu icon"
                          width={24}
                          height={24}
                        />
                      </div>
                    )}
                  </div>
                </button>
              );
            }
            return (
              <NextLink
                key={`mobile-menu-link-${index}`}
                href={item.to || ""}
                className={`w-full cursor-pointer py-3 font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] pl-6 ${
                  darkMode ? "text-capx-light-bg" : "text-[#053749]"
                }`}
                onClick={handleMenuStatus}
              >
                <div className="flex justify-between items-center">
                  {item.title}
                  {item.image && (
                    <div className="px-8">
                      <Image
                        src={item.image}
                        alt="Menu icon"
                        width={24}
                        height={24}
                      />
                    </div>
                  )}
                </div>
              </NextLink>
            );
          }
          return null;
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap w-10/12 text-2xl mx-auto mb-8">
      {menuDataLoggedIn.map((item, index) => {
        if (item.active) {
          return (
            <Link
              key={`mobile-menu-link-${index}`}
              activeClass="active"
              to={item.to || ""}
              spy={true}
              smooth={true}
              hashSpy={true}
              duration={500}
              delay={150}
              isDynamic={true}
              ignoreCancelEvents={false}
              spyThrottle={500}
              onClick={handleMenuStatus}
              className={`w-full cursor-pointer border-b py-3 text-center font-[Montserrat] text-[14px] not-italic font-extrabold leading-[normal] ${
                darkMode ? "text-capx-light-bg" : "text-[#053749]"
              }`}
            >
              {item.title}
            </Link>
          );
        }
        return null;
      })}
    </div>
  );
}
