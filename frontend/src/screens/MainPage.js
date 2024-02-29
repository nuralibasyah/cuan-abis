import { useActiveMenu } from "react-active-menu";
import "./styles.css";

export default function App() {
  const { registerSection, registerTrigger } = useActiveMenu({
    offset: 60,
    smooth: true
  });

  return (
    <>
      <nav className="triggers">
        <ul>
          <li>
            <button ref={registerTrigger("section-1")} type="button">
              Section 1
            </button>
          </li>
          <li>
            <button ref={registerTrigger("section-2")} type="button">
              Section 2
            </button>
          </li>
          <li>
            <button ref={registerTrigger("section-3")} type="button">
              Section 3
            </button>
          </li>
          <li>
            <button ref={registerTrigger("section-4")} type="button">
              Section 4
            </button>
          </li>
          <li>
            <button ref={registerTrigger("section-5")} type="button">
              Section 5
            </button>
          </li>
          <li>
            <button ref={registerTrigger("section-6")} type="button">
              Section 6
            </button>
          </li>
        </ul>
      </nav>
      <div className="sections">
        <section ref={registerSection("section-1")}>
          <h2>Section 1</h2>
        </section>
        <section ref={registerSection("section-2")}>
          <h2>Section 2</h2>
        </section>
        <section ref={registerSection("section-3")}>
          <h2>Section 3</h2>
        </section>
        <section ref={registerSection("section-4")}>
          <h2>Section 4</h2>
        </section>
        <section ref={registerSection("section-5")}>
          <h2>Section 5</h2>
        </section>
        <section ref={registerSection("section-6")}>
          <h2>Section 6</h2>
        </section>
      </div>
    </>
  );
}
