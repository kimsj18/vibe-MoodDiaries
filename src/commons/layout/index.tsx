import React from 'react';
import Image from 'next/image';
import styles from './styles.module.css';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className={styles.layout}>
            <header className={styles.header}>
                <div className={styles.logo}>민지의 다이어리</div>
            </header>
            <div className={styles.gap}></div>
            <div className={styles.banner}>
                <Image 
                    src="/images/banner.png" 
                    alt="배너 이미지" 
                    width={1168} 
                    height={240}
                    className={styles.bannerImage}
                />
            </div>
            <div className={styles.gap}></div>
            <nav className={styles.navigation}>
                <div className={styles.tabContainer}>
                    <div className={styles.tabActive}>
                        <span className={styles.tabText}>일기보관함</span>
                    </div>
                    <div className={styles.tabInactive}>
                        <span className={styles.tabText}>사진보관함</span>
                    </div>
                </div>
            </nav>
            <main className={styles.children}>{children}</main>
            <div className={styles.gap}></div>
            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.footerTitle}>민지의 다이어리</div>
                    <div className={styles.footerInfo}>
                        <div className={styles.footerText}>대표 : name</div>
                        <div className={styles.footerCopyright}>Copyright © 2024. name Co., Ltd.</div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
