'use client'

import React from 'react'

import { useQuery } from '@tanstack/react-query'

import { addComment, blogPostState } from '@/app/[locale]/(marketing)/(blog)/blog-post.state'
import { type PostIDLessCommentDto } from '@/db/dto/comment.dto'
import { type Post } from '@/sanity/schemas/post'

export function BlogPostStateLoader({ post }: { post: Post }) {
  const { data: comments } = useQuery({
    queryKey: ['comments', post._id],
    queryFn: async () => {
      const res = await fetch(`/api/comments/${post._id}`)
      const data = await res.json()
      return data as PostIDLessCommentDto[]
    },
    initialData: [],
  })

  React.useEffect(() => {
    blogPostState.postId = post._id
  }, [post._id])
  React.useEffect(() => {
    // only append new comments
    comments?.forEach((comment) => {
      if (blogPostState.comments.find((c) => c.id === comment.id)) return
      addComment(comment)
    })
  }, [comments])

  return null
}
