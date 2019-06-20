#!/bin/python

import csv
import json
import io
import sys
import argparse

ROWS_WANTED = 1000

i90_fields = [
    'caseId','receiptNumber','creationDate',
    'channelType','i90SP','caseState','caseStatus','caseSubstatus',
    'applicationReason','caseAge'
]

arg_opener = lambda(filename): io.open(filename, encoding='utf-8-sig')

parser = argparse.ArgumentParser()
parser.add_argument("source_file", type=arg_opener)
parser.add_argument("--previous-file", type=arg_opener)
a = parser.parse_args()



# r = csv.DictReader(io.open(a.source_file, encoding='utf-8-sig'))
r = csv.DictReader(a.source_file)
extracted = []
ignore_receipts = set()

if a.previous_file:
    for i in range(ROWS_WANTED):
        ignore_receipts.add(r.next()['receiptNumber'])
    r = csv.DictReader(a.previous_file)

for i in range(ROWS_WANTED):
    rec = r.next()
    if rec["receiptNumber"] not in ignore_receipts:
        extracted.append({k: rec[k] for k in i90_fields})

print json.dumps(extracted)
