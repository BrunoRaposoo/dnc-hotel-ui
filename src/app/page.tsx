import Button from "../components/Button";
import Link from "../components/Link";

export default function Home() {
  return (
    <section>
      Pagina Principal
      <Button>
        Clique aqui
      </Button>
      <Button appearance="secondary">Clique em mim</Button>
      <Link href={"/teste"}>Ir para teste</Link>
    </section>
  );
}
