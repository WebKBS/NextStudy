'use server';
import { createComment } from '@/lib/comments';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createCommentAction(formData) {
  console.log('[action] user: ', formData.get('user'));
  console.log('[action] message: ', formData.get('message'));

  if (!formData.get('user') || !formData.get('message')) {
    return { isError: true, message: 'Please fill in all fields' };
  }

  const data = {
    slug: formData.get('slug'),
    user: formData.get('user'),
    message: formData.get('message'),
  };

  const message = await createComment(data);

  console.log('created: ', message);
  revalidatePath(`/reviews/${data.slug}`); // 캐시 삭제
  redirect(`/reviews/${data.slug}`);
}
