import { getPosts } from '@/services/wordpress';

export default async function TestPage() {
  const posts = await getPosts();

  return (
    <div>
      <h1>Posts de WordPress</h1>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>
            <h2>{post.title.rendered}</h2>
            <p><strong>Fecha:</strong> {post.date}</p>
            <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
          </li>
        ))}
      </ul>
    </div>
  );
}
