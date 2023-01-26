import { Router, useRouter } from "next/router";

const styles = {
	wrapper: `w-min text-[1.35rem] flex items-center rounded-[100px]  lg:py-[0.6rem]  px-5 cursor-pointer hover:bg-[#191919] transition-all hover:duration-200 hover:ease-in-out`,
	iconContainer: `mr-4`,
	textGeneral: `font text-[1.3rem] hidden lg:inline`,
	textActive: `font-bold hidden lg:inline`,
};
const SidebarOption = ({ text, Icon, isActive, setSelected, redirect }) => {
	const router = useRouter();
	return (
		<div
			className={styles.wrapper}
			onClick={(e) => {
				e.preventDefault();
				setSelected(text);
				text !== "More" && router.push(redirect);
			}}
		>
			<div className={styles.iconContainer}>
				<Icon />
			</div>
			<div className={isActive ? styles.textActive : styles.textGeneral}>{text}</div>
		</div>
	);
};

export default SidebarOption;
