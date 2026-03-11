import Button from "../components/Button";
import ImageField from "../components/Form/ImageField";
import TextField from "../components/Form/TextField";
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
      <TextField label="Nome Completo"></TextField>
      <ImageField label="Selecione uma imagem" />
    </section>
  );
}
