//% color=#c7dc68
//% icon="\uf0b1"
//% blockGap=8 block="itembox"
//% groups='["Create", "Modify"]'
namespace itembox {

    //% blockNamespace="itembox"
    //% color=#e198b4
    export class itemStorageObject{
        public selectedItemIndex = -1
        public currentItemCntList :Number[] = [];
        public itemCntList: number[] = []
        public itemBG :Sprite;
        public itemTextSpriteList: TextSprite[] = [];
        constructor(){
        }

        public loadItemStorage (imageList:Image[]) {
            this.selectedItemIndex = -1
            this.itemBG = sprites.create(img`
        ffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffff
                `, SpriteKind.Player)
            this.itemBG.setPosition(22, 15)
            this.itemBG.z = 99
            this.itemTextSpriteList = []
            for (let index4 = 0; index4 <= imageList.length - 1; index4++) {
                this.itemTextSpriteList.push(textsprite.create("", 0, 1))
                this.itemCntList.push(0)
            }
            let index = 0
            for (let value2 of this.itemTextSpriteList) {
                value2.setText(" x" + "1")
                value2.setMaxFontHeight(8)
                value2.setIcon(imageList[index])
                value2.setPosition(24, 14)
                value2.setFlag(SpriteFlag.RelativeToCamera, true)
                value2.setFlag(SpriteFlag.Invisible, true)
                value2.z = 99
                index = index + 1
            }
            this.itemBG.setFlag(SpriteFlag.Invisible, true)
        }

        //% blockId=item_storage_additem block="$this(itembox) add Item No $itemNo amount $itemCnt"
        //% weight=100 blockGap=8 group="Modify"
        public addItem (itemNo: number, itemCnt: number) {
            this.itemCntList[itemNo] = this.itemCntList[itemNo] + itemCnt
            if (this.itemCntList[itemNo] > 9) {
                this.itemCntList[itemNo] = 9
            }
            this.showItem()
        }


        //% blockId=item_storage_toggle block="$this(itembox) toggle selected item"
        //% weight=100 blockGap=8 group="Modify"
        public toggleEquipItem () {
            let val2 = 0
            if (this.selectedItemIndex != -1) {
                val2 = this.selectedItemIndex
            } else {
                val2 = 0
            }
            for (let index = 0; index <= this.itemCntList.length; index++) {
                val2 = (val2 + 1) % this.itemCntList.length
                if (this.itemCntList[val2] != 0) {
                    this.selectedItemIndex = val2
                    break;
                }
            }
            this.showItem()
        }

        //% blockId=item_storage_showitem block="$this(itembox) Show current item"
        //% weight=100 blockGap=8 group="Modify"
        public showItem () {
            this.itemBG.setFlag(SpriteFlag.Invisible, true)
            for (let value of this.itemTextSpriteList) {
                value.setFlag(SpriteFlag.Invisible, true)
            }
            if (this.selectedItemIndex == -1) {
                for (let index2 = 0; index2 <= this.itemCntList.length - 1; index2++) {
                    if (this.itemCntList[index2] != 0) {
                        this.selectedItemIndex = index2
                        break;
                    }
                }
            } else if (this.itemCntList[this.selectedItemIndex] == 0) {
                this.selectedItemIndex = -1
                for (let index3 = 0; index3 <= this.itemCntList.length - 1; index3++) {
                    if (this.itemCntList[index3] != 0) {
                        this.selectedItemIndex = index3
                        break;
                    }
                }
            }
            if (this.selectedItemIndex != -1) {
                this.itemTextSpriteList[this.selectedItemIndex].setFlag(SpriteFlag.Invisible, false)
                this.itemTextSpriteList[this.selectedItemIndex].setText(" x" + this.itemCntList[this.selectedItemIndex])
                this.itemBG.setFlag(SpriteFlag.Invisible, false)
            }
        }

        //% blockId=item_storage_deleteitem block="$this(itembox) delete Item No $itemNo amount $itemCnt"
        //% weight=100 blockGap=8 group="Modify"
        public deleteItem (itemNo: number, itemCnt: number) {
            this.itemCntList[itemNo] = this.itemCntList[itemNo] - itemCnt
            if (this.itemCntList[itemNo] < 0) {
                this.itemCntList[itemNo] = 0
            }
            this.showItem()
        }

        //% blockId=item_storage_getselecteditemno block="get selected Item No. from $this(itembox)  "
        //% weight=100 blockGap=8 group="Query"
        public getSelectedItemNo () :number {
            return this.selectedItemIndex
        }

        //% blockId=item_storage_getitemcount block="get item count Item No. $itemNo from $this(itembox)"
        //% weight=100 blockGap=8 group="Query"
        public getItemCount (itemNo:number) :number {
            if(this.selectedItemIndex != -1){
                return this.itemCntList[this.selectedItemIndex]
            } else {
                return 0
            }
        }        

    }//end of class

    
    //% blockId=item_storage_create block="$this(itembox) Create with %imagelist"
    //% blockSetVariable="itembox"
    //% blockNamespace="itembox"
    //% weight=100 blockGap=8 group="Create"
    export function create(imagelist:Image[]) : itemStorageObject {
       // itemStorageObject
       const itembox = new itemStorageObject();
       itembox.loadItemStorage(imagelist)
       return itembox;
    }




}

