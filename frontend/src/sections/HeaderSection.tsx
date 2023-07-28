import React, { useState } from "react";
import LogoComponent from "../components/HeaderComponents/LogoComponent";
import SearchComponent from "../components/HeaderComponents/SearchComponent";
import IconComponent from "../components/HeaderComponents/IconComponent";
import { LuContact } from "react-icons/lu";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import css from "./HeaderSection.module.scss";
import ContactFromIconComponent from "../components/HeaderComponents/ContactFromIconComponent";
function HeaderSection() {
  let quantity = 1;
  return (
    <div className={css.header}>
      <LogoComponent type="logoNavbar" />
      <SearchComponent />
      <div className={css.contact}>
        <IconComponent text="Kontakt">
          <LuContact />
        </IconComponent>
        <ContactFromIconComponent />
      </div>
      <IconComponent text="Zaloguj">
        <AiOutlineUser />
      </IconComponent>
      <IconComponent text="Koszyk">
        {quantity === 0 ? "" : <p className={css.circle}>{quantity}</p>}
        <AiOutlineShoppingCart />
      </IconComponent>
    </div>
  );
}

export default HeaderSection;
