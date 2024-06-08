'use server';
import { cookies } from 'next/headers';

export async function setCookie(data) {
  cookies().set(data);
}