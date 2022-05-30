import { Post } from "@prisma/client"
import { prisma } from "~/db.server"

type PartialPost = Omit<Post, "id" | "createdAt" | "updatedAt">

export async function getPosts() {
  return prisma.post.findMany({ orderBy: [{ createdAt: "desc" }] })
}

export async function getPost(slug: string) {
  return prisma.post.findUnique({ where: { slug } })
}

export async function createPost(post: PartialPost) {
  return prisma.post.create({
    data: { ...post, createdAt: Date.now(), updatedAt: Date.now() },
  })
}

export async function updatePost(id: string, post: PartialPost) {
  return prisma.post.update({
    where: { id },
    data: { ...post, updatedAt: Date.now() },
  })
}

export async function deletePost(id: string) {
  return prisma.post.delete({ where: { id } })
}
