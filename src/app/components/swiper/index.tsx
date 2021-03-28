import React, { useEffect, useRef, useState } from 'react'
import './index.less'

/**
 * @description 轮播组件
 * @param {array} props.bannerList 轮播图数据
 * @param {object} props.autoPlay 是否开启轮播
 */

interface item {
    pic: string
}

interface props {
    bannerList: item[],
    autoPlay: boolean,
    autoPlayTime?: number
}

interface event {
    target: {
        getBoundClientRect: () => {}
    }
}


let moveTimer: NodeJS.Timer | number = null;
let distance: number = 0; //手指拖动屏幕的距离

const Swiper = (props: props) => {
    const {
        bannerList = [],
        autoPlay,
        autoPlayTime
    } = props
    const [currentId, setCurrentId] = useState(0)
    const swiperUl = useRef(null)

    const mouseMove = (event: React.TouchEvent<HTMLDivElement>) => {
        console.log('mouseMove', event.target)
        if (moveTimer) clearTimeout(Number(moveTimer));
        moveTimer = setTimeout(() => {
            console.log('swiperUl', swiperUl);
        }, 30);
    }

    const mouseMoveEnd = (event: React.TouchEvent<HTMLDivElement> | { target: any }) => {
        console.log('mouseMoveEnd', event.target)
        const target = event.target;
        console.log('', target.scrollLeft);
        const width = swiperUl.current.clientWidth;  //单张图片的宽度
        /* 左滑超过半屏 播放下一张图片 */
        if (distance > (width / 2)) {
            setCurrentId(currentId + 1);
        }
        /* 右滑超过半屏 播放下一张图片 */
        if (distance < -(width / 2)) {
            setCurrentId(currentId - 1);
        }
    }

    const renderBannerList = () => {
        return bannerList.map((item: item, index: number) => {
            return (
                <div
                    key={`com_swiper_li_${index}`}
                    className='com_swiper_li'
                >
                    <div className='com_swiper_li_img'>
                        <img src={item.pic}/>
                    </div>
                </div>
            )
        })
    }

    useEffect(() => {
        if (autoPlay) {
            let currentBannerId = currentId
            const autoPlayTimer = setInterval(() => {
                console.log('currentBannerId', currentBannerId);
                if (swiperUl) {
                    if (currentBannerId >= bannerList.length - 1) {
                        swiperUl.current.scrollLeft = 0
                        currentBannerId = 0
                        return
                    }
                    currentBannerId++
                    swiperUl.current.scrollLeft = swiperUl.current.scrollLeft + 375
                }
            }, autoPlayTime || 2000);
            return () => {
                clearInterval(autoPlayTimer)
            };
        }
    }, [currentId, bannerList]);

    return (
        <div className='com_swiper'>        
            <div
                ref={swiperUl}
                className='com_swiper_ul'
                onTouchMove={mouseMove}
                onTouchEnd={mouseMoveEnd}
            >
                {renderBannerList()}
            </div>
        </div>
    )
}
export default Swiper;