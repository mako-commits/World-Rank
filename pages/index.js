import CountriesTable from "../components/CountriesTable.js/CountriesTable";
import styles from "../styles/Home.module.css";

export default function Home({ countries }) {
  console.log(countries);
  return (
    <div className={styles.container}>
      <div>Found {countries.length}</div>
      <CountriesTable countries={countries} />
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.com/v2/all");
  const countries = await res.json();

  return {
    props: {
      countries,
    },
  };
};
