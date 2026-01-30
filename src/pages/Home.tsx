import HubLink from "../components/Hublink";
import LinkCard from "../components/LinkCard";

function Home() {
  return (
    <>
      <div>
        <h1>Jennifer Louise</h1>
        <h3>
          <i>Chasing daydreams, catching sunbeams</i>
        </h3>
        <div>
          <LinkCard>
            <HubLink title="PHOTOS" href="https://photos.jenniferlouise.io" />
          </LinkCard>
        </div>
      </div>
    </>
  );
}

export default Home;
