import { SearchRounded } from "@mui/icons-material";
import React from "react";
import styles from "./SearchInput.module.css";
const SearchInput = ({ ...rest }) => {
  return (
    <div className={styles.wrapper}>
      <SearchRounded />
      <input className={styles.input} {...rest} />
    </div>
  );
};

export default SearchInput;
