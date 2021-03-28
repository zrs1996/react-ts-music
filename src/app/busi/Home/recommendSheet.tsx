import React from 'react';
import ScrollWrapper from 'app/busi/components/scrollWrapper/index';
import Card from 'app/busi/components/card';
/* 首页-推荐歌单 */
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

const RecommendSheet = (props: props) => {
    const { sheetList } = props;
    console.log(sheetList);

    const renderSheet = () => {
        return sheetList.map((item, index) => {
            return <div className='recommend_sheet_li' key={index}>
                <div className='img'><img src={item.uiElement.image.imageUrl} /></div>
                <div className='title'>{item.uiElement.mainTitle.title}</div>
            </div>
        })
    }

    /* 点击更多按钮 进入推荐歌单 */
    const toRecommendSheetMore = () => {
        console.log('toRecommendSheetMore');
    }

    return <Card>
        <ScrollWrapper
            title='推荐歌单'
            button={{ title: '更多', callBack: toRecommendSheetMore }}>
            <div className='recommend_sheet_ul'>
                {renderSheet()}
            </div>
        </ScrollWrapper>
    </Card>
}
export default RecommendSheet;