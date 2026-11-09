import { ConnectionStory, Questions } from "@/components/jetstream/Stories";
import Compatibility from "@/components/jetstream/Compatibility";
export default function How() {
  return (
    <>
      <ConnectionStory standalone />
      <section className="container js-section">
        <Compatibility />
      </section>
      <Questions />
    </>
  );
}
