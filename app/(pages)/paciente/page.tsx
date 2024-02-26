import { getInfoPersona } from "@/app/actions";
import HeaderProfile from "../doctor/components/header-profile";
import PersonalInfo from "../doctor/components/personal-info";

export default async function PacientePage() {
  const { usuario, errorUsuario, message } = await getInfoPersona();

  if (errorUsuario) {
    return (
      <div>
        <span>Error al obtener los datos del usuario</span>
      </div>
    );
  }

  return (
    <main className="px-8 py-2">
      <HeaderProfile usuario={usuario ?? null} />
      <aside className="flex flex-col md:flex-row w-full md:space-x-4 ">
        <section className="my-4 flex-col  space-y-4 w-full ">
          <PersonalInfo usuario={usuario ?? null} />
        </section>
      </aside>
    </main>
  );
}
