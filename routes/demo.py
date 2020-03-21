from selenium import webdriver
driver=webdriver.Chrome()
driver.get('https://web.whatsapp.com/')

name=input('Enter the name of user or group: ')
msg=input('Enter your message: ')
count=int(input("How many times: "))

input("Enter anythig after sscaning QR")
user= driver.find_element_by_xpath('//span[@title="{}"]'.format(name))
user.click()
msgbox=driver.find_element_by_class_name('_3u328 copyable-text selectable-text')
for i in range(count):
	msgbox.send_keys(msg)
	button=diver.find_element_by_class_name('hnQHL')
	button.click()
