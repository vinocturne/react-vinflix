import {
    AnimatePresence,
    motion,
    useAnimation,
    useViewportScroll,
} from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const Nav = styled(motion.nav)`
    z-index: 999999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: 100%;
    top: 0;
    color: ${(props) => props.theme.white.lighter};
    height: 80px;
    font-size: 14px;
`;

const Col = styled.div`
    display: flex;
    align-items: center;
`;

const Logo = styled(motion.svg)`
    z-index: 999999;
    margin-right: 70px;
    margin-left: 60px;
    width: 95px;
    height: 25px;
    color: ${(props) => props.theme.white.darker};
    transition: color 0.3s ease-in-out;
    position: relative;
    display: flex;
    fill: ${(props) => props.theme.red};
    justify-content: center;
    flex-direction: column;
    &:hover {
        color: ${(props) => props.theme.white.lighter};
    }
`;

const Search = styled.form`
    color: white;
    display: flex;
    align-items: center;
    margin-right: 30px;
    position: relative;
    cursor: pointer;
    svg {
        height: 25px;
        z-index: 99999;
    }
`;

const Items = styled.ul`
    display: flex;
    align-items: center;
`;
const Item = styled.li`
    margin-right: 20px;
    cursor: pointer;
    color: ${(props) => props.theme.white.darker};
    transition: color 0.3s ease-in-out;
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const Circle = styled(motion.span)`
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.red};
    bottom: -10px;
    left: 0;
    right: 0;
    margin: 0 auto;
`;

const Input = styled(motion.input)`
    transform-origin: right center;
    position: absolute;
    left: -185px;
    /* top: 0; */
    width: 200px;
    background-color: transparent;
    border: 1px solid ${(props) => props.theme.white.lighter};
    padding-top: 10px;
    padding-left: 35px;
    padding-bottom: 10px;
    color: ${(props) => props.theme.white.lighter};
    :focus {
        outline: none;
    }
`;

const logoVariants = {
    normal: {
        fillOpacity: 1,
    },
    active: {
        fillOpacity: [1, 0, 1],
        transition: {
            repeat: Infinity,
        },
    },
};

const SelectLanguage = styled.div`
    margin-right: 30px;
    select {
        height: 40px;
    }
`;

interface IForm {
    keyword: string;
}

function Header() {
    const { i18n, t } = useTranslation();
    const [searchOpen, setSearchOpen] = useState(false);
    const { register, handleSubmit } = useForm<IForm>();
    const homeMatch = useMatch("/");
    const tvMatch = useMatch("/tv");
    const inputAnimation = useAnimation();
    //useAnimation을 이용해 코드 상의 원하는 타이밍에 애니메이션을 실행시킬 수 있다.
    const openSearch = () => {
        if (searchOpen) {
            inputAnimation.start({
                scaleX: 0,
            });
        } else {
            inputAnimation.start({
                scaleX: 1,
            });
        }
        setSearchOpen((prev) => !prev);
    };

    const navVariants = {
        top: {
            backgroundColor: "rgb(0, 0, 0,0)",
        },
        scroll: {
            backgroundColor: "rgba(0,0,0,1)",
        },
    };
    const { scrollY } = useViewportScroll();
    const navAnimation = useAnimation();
    useEffect(() => {
        scrollY.onChange(() => {
            if (scrollY.get() > 40) {
                navAnimation.start("scroll");
            } else {
                navAnimation.start("top");
            }
        });
    }, [scrollY, navAnimation]);
    const navigate = useNavigate();
    const onValid = (data: IForm) => {
        navigate(`/search?keyword=${data.keyword}`);
    };
    const changeLanguage = (lng: React.ChangeEvent<HTMLSelectElement>) => {
        i18n.changeLanguage(lng.target.value);
    };
    return (
        <Nav variants={navVariants} animate={navAnimation} initial="top">
            <Col>
                <Logo
                    variants={logoVariants}
                    whileHover="active"
                    initial="normal"
                    xmlns="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                    width="1024"
                    height="276.742"
                    viewBox="0 0 1024 276.742"
                >
                    <motion.path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
                </Logo>
                <AnimatePresence>
                    <Items>
                        <Item>
                            <Link to="/">
                                {t("header_home")}
                                {homeMatch && <Circle layoutId="circle" />}
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/tv">
                                {t("header_tv")}
                                {tvMatch && <Circle layoutId="circle" />}
                            </Link>
                        </Item>
                    </Items>
                </AnimatePresence>
            </Col>
            <Col>
                <Search onSubmit={handleSubmit(onValid)}>
                    <motion.svg
                        animate={{ x: searchOpen ? -180 : 0 }}
                        onClick={openSearch}
                        transition={{ type: "linear" }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                        ></path>
                    </motion.svg>
                    <Input
                        {...register("keyword", {
                            required: true,
                            minLength: 2,
                        })}
                        animate={inputAnimation}
                        initial={{ scaleX: 0 }}
                        transition={{ type: "linear" }}
                        placeholder="Search for movie or tv show..."
                    />
                </Search>
                <SelectLanguage>
                    <select onChange={(lng: any) => changeLanguage(lng)}>
                        <option value="ko">한국어</option>
                        <option value="en">English</option>
                        <option value="jp">日本語</option>
                    </select>
                </SelectLanguage>
            </Col>
        </Nav>
    );
}

export default Header;