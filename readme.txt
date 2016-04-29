使用说明
1. 将puzzle文件夹放到服务器中，访问index.html即可
2. 默认使用的是战马，在路径后面加上show=dafenqi可以使用达芬奇
   比如路径为http://www.ticketdashi.com/puzzle/index.html，这个是战马的拼图
    达芬奇的则为http://www.ticketdashi.com/puzzle/index.html?show=dafenqi
3. 如果需要换一套演出的拼图，有以下两种方法：
    3.1 替换puzzle/img/default中的图片，修改show.json，可以直接访问http://www.ticketdashi.com/puzzle/index.html
    3.2 在img文件夹下，创建新的文件夹，比如lijian，在lijian文件夹下加入相应的图片及json文件，可以参考dafenqi，然后就可以用类似达芬奇中的方式访问，http://www.ticketdashi.com/puzzle/index.html?show=lijian，其中lijian就是对应的新创建的文件夹
 
注：image0.jpg，image1.jpg，image2.jpg为要拼的图片，数字对应初、中、高级，只能是jpg格式
      qrcode.png对应优惠券的二维码，只能是png格式
      show.json可以用text打开，需要修改里面coupon，rule，remakr后面的描述文字
      coupon是拼图完成后活动按钮的文字，rule是活动界面中的标题，remark是活动的说明