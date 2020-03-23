import datetime

currentFullDate = datetime.datetime.now()
currentDate = datetime.date(currentFullDate.year, currentFullDate.month, currentFullDate.day)
# year month day
date1 = datetime.date(2014, 3, 2)
date2 = datetime.date(2020, 3, 23)


print(date1 == date2)
print(currentDate == date2)
print(currentDate)