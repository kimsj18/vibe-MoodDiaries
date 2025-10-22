"use client";

import React from 'react';
import Image from 'next/image';
import styles from './styles.module.css';
import { useLinkRouting } from './hooks/index.link.routing.hook';
import { useAreaVisibility } from './hooks/index.area.hook';
import { useAuthStatus } from './hooks/index.auth.hook';
import Button from '@/commons/components/button';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const {
        handleLogoClick,
        handleDiariesTabClick,
        handlePicturesTabClick,
        getDiariesTabClass,
        getPicturesTabClass,
    } = useLinkRouting();

    const {
        isHeaderVisible,
        isLogoVisible,
        isBannerVisible,
        isNavigationVisible,
        isFooterVisible,
    } = useAreaVisibility();

    const {
        isLoggedIn,
        handleLoginClick,
        handleLogoutClick,
        getUserName,
    } = useAuthStatus();

    return (
        <div className={styles.layout} data-testid="layout">
            {isHeaderVisible && (
                <header className={styles.header}>
                    {isLogoVisible && (
                        <div 
                            className={styles.logo} 
                            onClick={handleLogoClick}
                            data-testid="logo"
                        >
                            민지의 다이어리
                        </div>
                    )}
                    {/* 인증 상태 UI - 로그인 상태에 따라 분기 */}
                    <div className={styles.authStatus}>
                        {isLoggedIn ? (
                            <>
                                <span 
                                    className={styles.userName}
                                    data-testid="user-name"
                                >
                                    {getUserName()}님
                                </span>
                                <Button
                                    variant="secondary"
                                    theme="light"
                                    size="medium"
                                    className={styles.logoutButton}
                                    onClick={handleLogoutClick}
                                    data-testid="logout-button"
                                >
                                    로그아웃
                                </Button>
                            </>
                        ) : (
                            <Button
                                variant="primary"
                                theme="light"
                                size="medium"
                                onClick={handleLoginClick}
                                data-testid="login-button"
                            >
                                로그인
                            </Button>
                        )}
                    </div>
                </header>
            )}
            {(isHeaderVisible || isBannerVisible) && <div className={styles.gap}></div>}
            {isBannerVisible && (
                <div className={styles.banner} data-testid="banner">
                    <Image 
                        src="/images/banner.png" 
                        alt="배너 이미지" 
                        width={1168} 
                        height={240}
                        className={styles.bannerImage}
                    />
                </div>
            )}
            {(isBannerVisible || isNavigationVisible) && <div className={styles.gap}></div>}
            {isNavigationVisible && (
                <nav className={styles.navigation} data-testid="navigation">
                    <div className={styles.tabContainer}>
                        <div 
                            className={getDiariesTabClass(styles)}
                            onClick={handleDiariesTabClick}
                            data-testid="tab-diaries"
                        >
                            <span className={styles.tabText}>일기보관함</span>
                        </div>
                        <div 
                            className={getPicturesTabClass(styles)}
                            onClick={handlePicturesTabClick}
                            data-testid="tab-pictures"
                        >
                            <span className={styles.tabText}>사진보관함</span>
                        </div>
                    </div>
                </nav>
            )}
            <main className={styles.children}>{children}</main>
            {isFooterVisible && <div className={styles.gap}></div>}
            {isFooterVisible && (
                <footer className={styles.footer} data-testid="footer">
                    <div className={styles.footerContent}>
                        <div className={styles.footerTitle}>민지의 다이어리</div>
                        <div className={styles.footerInfo}>
                            <div className={styles.footerText}>대표 : name</div>
                            <div className={styles.footerCopyright}>Copyright © 2024. name Co., Ltd.</div>
                        </div>
                    </div>
                </footer>
            )}
        </div>
    );
}
