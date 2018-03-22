#!/usr/bin/env python

import json
import sys


def file2json(source, out, key='text'):
    with open(source) as f:
        data = f.read()
    with open(out, 'w') as f:
        f.write(
            json.dumps({ key: data })
        )


if __name__ == '__main__':
    file2json(sys.argv[1], sys.argv[2])