import Image from "next/image";
import Logo from "@/assets/logos/ticto-logo.svg";
import styles from "@/app/styles/Header.module.scss";

interface HeaderProps {
  setShowModal: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setShowModal }) => {
  return (
    <header className={styles["header"]}>
      <div className={styles["header-content"]}>
        <Image src={Logo} alt="Logotipo" width={180} />
        <button
          onClick={() => setShowModal(true)}
          className={styles["open-modal"]}
        >
          NOVA TRANSAÇÃO
        </button>
      </div>
    </header>
  );
};

export default Header;
