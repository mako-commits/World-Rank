import Layout from "../../components/Layout/Layout";
import styles from "./Country.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";

const getCountry = async (id) => {
  const res = await fetch(`https://restcountries.com/v2/alpha/${id}`);
  const country = await res.json();
  return country;
};
const Country = ({ country }) => {
  console.log(country);
  const [borders, setBorders] = useState([]);
  const [hasBorders, setHasBorders] = useState(false);
  const getBorders = async () => {
    try {
      const borders = await Promise.all(
        country.borders.map((border) => getCountry(border))
      );
      setBorders(borders);
      setHasBorders(true);
    } catch {
      setHasBorders(false);
    }
  };
  useEffect(() => {
    getBorders();
  }, []);
  console.log(borders);
  return (
    <Layout title={country.name}>
      <div className={styles.container}>
        <div className={styles.container_left}>
          {" "}
          <div className={styles.overview_panel}>
            {/* <Image
            src={country.flag}
            alt={country.name}
            width={500}
            height={500}
          /> */}
            <img src={country.flag} alt={country.name}></img>
            <h1 className={styles.overview_name}>{country.name}</h1>
            <div className={styles.overview_region}>{country.region}</div>
            <div className={styles.overview_numbers}>
              <div className={styles.overview_population}>
                <div className={styles.overview_value}>
                  {country.population}
                </div>
                <div className={styles.overview_label}>Population</div>
              </div>

              <div className={styles.overview_area}>
                <div className={styles.overview_value}>{country.area}</div>
                <div className={styles.overview_label}>Area</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container_right}>
          {" "}
          <div className={styles.details_panel}>
            <h4 className={styles.details_panel_heading}>Details</h4>
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Capital</div>
              <div className={styles.details_panel_value}>
                {country.capital}
              </div>
            </div>
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Native Name</div>
              <div className={styles.details_panel_value}>
                {country.nativeName}
              </div>
            </div>
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Subregion</div>
              <div className={styles.details_panel_value}>
                {country.subregion}
              </div>
            </div>
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Language</div>
              <div className={styles.details_panel_value}>
                {country.languages.map(({ name }) => name).join(", ")}
              </div>
            </div>
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Currencies</div>
              <div className={styles.details_panel_value}>
                {(country.currencies &&
                  country.currencies.map(({ name }) => name).join(", ")) ||
                  "unknown"}
              </div>
            </div>
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Gini</div>
              <div className={styles.details_panel_value}>
                {country.gini || 0} %
              </div>
            </div>

            {hasBorders && (
              <div className={styles.details_panel_borders}>
                <div className={styles.details_panel_borders_label}>
                  Borders
                </div>
                <div className={styles.details_panel_container}>
                  {borders.map(({ flag, name }) => (
                    <div
                      className={styles.details_panel_country}
                      key={borders.index}
                    >
                      <img src={flag}></img>
                      <div className={styles.details_panel_name}>{name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Country;

export const getServerSideProps = async ({ params }) => {
  const country = await getCountry(params.id);
  return {
    props: {
      country,
    },
  };
};
