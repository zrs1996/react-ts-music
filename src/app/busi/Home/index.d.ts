declare namespace Types {
    interface sheetItem {
        uiElement: {
            image: {
                imageUrl: string
            } ,
            mainTitle: {
                title: string
            }
        }
    }
    
    interface Blocks {
        blockCode: string
    }
    
    interface BlockInfo {
        [key: string]: any
    }
    
    interface homeData {
        [key: string]: {
            extInfo: {
                banners: {
                    [key: string]: string,
                    pic: string
                }[]
            },
            creatives: sheetItem[]
        }
    }
}
export = Types;
export as namespace Types;