import { useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import SbEditable from "storyblok-react";
import styles from "../../styles/Accordion.module.css";
import DynamicComponent from "../DynamicComponent";

const AccordionComp = ({ blok }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
        <Accordion>
          <Card className={styles.card}>
            <div className={styles.accordionItem} onClick={()=>setOpen(!open)}>
              <Accordion.Toggle
                as={Card.Header}
                variant="link"
                eventKey="0"
                className={styles.label}>
                  {blok.acc_title}
                <span className={styles['chevron'] + " " + (open ? styles['is-open']:'')}></span>
              </Accordion.Toggle>
            </div>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <SbEditable content={blok}>
                  <ul>
                    {blok.acc_content.map((nestedBlok) => (
                      <li key={nestedBlok._uid}>
                        <DynamicComponent blok={nestedBlok} />
                      </li>
                    ))}
                  </ul>
                </SbEditable>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
    </div>
  );
};

export default AccordionComp;
