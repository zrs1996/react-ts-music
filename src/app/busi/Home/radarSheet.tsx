import React from 'react';
import ScrollWrapper from 'app/busi/components/scrollWrapper/index';
import Card from 'app/busi/components/card';
/* 首页-雷达歌单 */
interface sheetItem {
    uiElement: {
        image: {
            imageUrl: string
        },
        mainTitle: {
            title: string
        }
    }
}

interface props {
    sheetList: sheetItem[]
}

const RadarSheet = (props: props) => {
    const { sheetList } = props;
    console.log('RadarSheet', sheetList);

    const renderSheet = () => {
        return sheetList.map((item, index) => {
            return <div className='recommend_sheet_li' key={index}>
                <div className='img'><img src={item.uiElement.image.imageUrl} /></div>
                <div className='title'>{item.uiElement.mainTitle.title}</div>
            </div>
        })
    }

    /* 点击更多按钮 进入雷达歌单 */
    const toMoreRadarSheet = () => {
        console.log('toMoreRadarSheet');
    }

    return <Card>
        <ScrollWrapper
            title='雷达歌单'
            button={{ title: '更多', callBack: toMoreRadarSheet }} >
            <div className='recommend_sheet_ul'>
                {renderSheet()}
            </div>
        </ScrollWrapper>
    </Card>
}
export default RadarSheet;