import React, { useEffect, useRef, useState } from 'react'
import { deepCopy } from 'app/common/utils'
import './index.less'

/**
 * @description 轮播组件
 * 1. 定时播放 √
 * 2. 轮播 √
 * 3. 手指触摸时 暂停播放 √
 * 4. 设置滑动阈值 滑动距离 >=50% 视为切换 否则不切换 √
 * 5. 点击切换
 * 6. 优化 滑动
 * 7. 优化 滚动
 * 8. 底部 轮播进度条 √
 * 9. 图片与底部进度条联动 √
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

let autoPlayTimer: ReturnType<typeof setTimeout> = null
let distance: number = 0 // screen distance moved by finger
let preScrollLeft: number = 0 // ul's scrollLeft moved previous 

const Swiper = (props: props) => {
    const {
        bannerList = [],
        autoPlay,
        autoPlayTime
    } = props
    const [currentId, setCurrentId] = useState(1) //current banner's id
    const [moveStartTag, setMoveStartTag] = useState(false) //finger is or not start touch screen
    const [list, setList] = useState([]) //list used to save banner data
    const swiperUl = useRef(null)

    const mousemoveStart = () => {
        if (autoPlayTimer) clearInterval(autoPlayTimer)
        if (!moveStartTag) setMoveStartTag(true)
        if (!preScrollLeft) preScrollLeft = swiperUl.current.scrollLeft
    }

    const mouseMove = (event: React.TouchEvent<HTMLDivElement>) => {
        // if (!preScrollLeft) preScrollLeft = swiperUl.current.scrollLeft
    }

    const mouseMoveEnd = (event: React.TouchEvent<HTMLDivElement> | { target: any }) => {
        distance = swiperUl.current.scrollLeft - preScrollLeft
        const width = swiperUl.current.clientWidth;  //单张图片的宽度

        if (distance > 0) {
            /* 向左滑超过半屏 播放下一张图片 */
            if (distance >= (width / 2)) {
                const index = currentId === bannerList.length ? 1 : currentId + 1
                setCurrentId(index);
            }
            if (distance < (width / 2)) {
                swiperUl.current.scrollLeft = preScrollLeft
            }
        }

        if (distance < 0) {
            /* 向右滑超过半屏 播放上一张图片 */
            if (distance < -(width / 2)) {
                const index = currentId === 1 ? bannerList.length : currentId - 1
                setCurrentId(index);
            }
            if (distance > -(width / 2)) {
                swiperUl.current.scrollLeft = preScrollLeft
            }
        }

        if (moveStartTag) setMoveStartTag(false)
        if (preScrollLeft) preScrollLeft = 0
    }

    const renderBannerList = () => {
        return list.map((item: item, index: number) => {
            return (
                <div key={`com_swiper_li_${index}`} className='com_swiper_li'>
                    <div className='com_swiper_li_img'>
                        <img src={item.pic} />
                    </div>
                </div>
            )
        })
    }

    const renderNavList = () => {
        let index = 0
        return bannerList.map(() => {
            index++
            const common_name = 'com_swiper_nav_li'
            const _className = index !== currentId ? common_name : `${common_name} ${common_name}_active`
            return (
                <div key={`com_swiper_nav_li_${index}`} className={_className}></div>
            )
        })
    }

    useEffect(() => {
        const _list = deepCopy([], bannerList, false)
        if (_list.length > 1) {
            _list.push(bannerList[0])
            _list.unshift(bannerList[bannerList.length - 1])
        }
        setList(_list)
    }, [bannerList]);

    useEffect(() => {
        const width = swiperUl.current.parentNode.clientWidth
        setTimeout(() => {
            swiperUl.current.scrollLeft = width * currentId
        }, 0);
        if (autoPlay && !moveStartTag) {
            let currentBannerId = currentId
            autoPlayTimer = setInterval(() => {
                if (currentBannerId >= bannerList.length) {
                    swiperUl.current.scrollLeft = width
                    currentBannerId = 1
                    setCurrentId(currentBannerId)
                    return
                }
                currentBannerId++
                swiperUl.current.scrollLeft = swiperUl.current.scrollLeft + width
                setCurrentId(currentBannerId)
            }, autoPlayTime || 2000);
            return () => clearInterval(autoPlayTimer);
        }
    }, [currentId, bannerList, moveStartTag]);

    return (
        <div className='com_swiper'>
            <div
                ref={swiperUl}
                className='com_swiper_ul'
                onTouchStart={mousemoveStart}
                onTouchMove={mouseMove}
                onTouchEnd={mouseMoveEnd}
            >
                {renderBannerList()}
            </div>
            <div className='com_swiper_nav'>
                {renderNavList()}
            </div>
        </div>
    )
}
export default Swiper;