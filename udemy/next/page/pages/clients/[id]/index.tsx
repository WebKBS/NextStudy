import { useRouter } from "next/router";

function ClientProjectsPage() {
  const router = useRouter();

  console.log(router.query);

  function loadProjectHandler() {
    // router.push("/clients/kang/projecta");
    router.push({
      pathname: "/clients/[id]/[clientproject]",
      query: { id: "kang", clientproject: "Project" },
    });
  }

  return (
    <div>
      <h1>Projects of a Given Client</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
}

export default ClientProjectsPage;
