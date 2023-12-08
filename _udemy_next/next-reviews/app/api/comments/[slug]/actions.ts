'use server';
import { createComment } from '@/lib/comments';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createCommentAction(formData) {
  console.log('[action] user: ', formData.get('user'));
  console.log('[action] message: ', formData.get('message'));

  const data = {
    slug: formData.get('slug'),
    user: formData.get('user'),
    message: formData.get('message'),
  };

  const error = validate(data);
  if (error) {
    return { isError: true, message: error };
  }

  const message = await createComment(data);

  console.log('created: ', message);
  revalidatePath(`/reviews/${data.slug}`); // 캐시 삭제
  redirect(`/reviews/${data.slug}`);
}

function validate(data) {
  if (!data.user) {
    return 'Name field is required';
  }

  if (data.user.length > 50) {
    return 'Name field must be less than 50 characters';
  }

  if (!data.message) {
    return 'Message field is required';
  }

  if (data.message.length > 500) {
    return 'Message field must be less than 500 characters';
  }
}
