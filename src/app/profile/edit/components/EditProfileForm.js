"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import TextArea from "./TextArea";
import TextInput from "./TextInput";
import SingleSelectInput from "./SingleSelectInput";
import SubmitButton from "./SubmitButton";
import LoadingSection from "../../components/LoadingSection";
import MultiSelectInput from "./MultiSelectInput";

export default function EditProfileForm({ session, language, pageContent, darkMode }) {}