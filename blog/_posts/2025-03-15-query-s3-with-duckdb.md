---
date: 2025-03-15
title: 'DuckDB를 이용하여 S3 테이블 쿼리하기'
tags: 
- db
---

요즘 DuckDB UI가 발표된 이후로 주변에서 DuckDB에 대한 관심이 많아지는 모습을 보았는데, 이름때문에 OLTP로 인식을 많이 하는 것 같기도 하고 역시 실제 어떻게 사용되는 모습인지를 보면 더 실감이 나지 않을까 싶어, 적절한 튜토리얼이 보여 함께 나누면 좋을 것 같아 [Query S3 Table with DuckDB 원문](https://tobilg.com/query-s3-tables-with-duckdb)을 번역해보았다. 

---

DuckDB는 AWS S3 테이블에서 Iceberg 데이터를 쿼리할 수 있는 새로운 기능을 미리보기로 제공하고 있다.

# S3 테이블 설정하기

DuckDB와 같은 도구로 쿼리할 수 있는 S3 테이블을 설정하려면 여러 단계가 필요하다. 아직 인프라 코드(IaC) 지원이 완전하지 않기 때문에 AWS 콘솔에서 수동으로 설정을 진행한다.

## S3 테이블 버킷 생성하기

AWS 콘솔을 열고 "Amazon S3" → "테이블 버킷"으로 이동한 후 "테이블 버킷 생성" 버튼을 클릭한다. 테이블 버킷의 이름을 입력한다.

처음으로 이 작업을 수행하는 경우, 특정 리전은 "AWS 분석 서비스와의 통합"을 활성화해야 한다. (참고로 서울리전은 활성화를 체크해주어야 한다.)

![create-table-bucket](/blog/assets/20250315/create-table-bucket.webp)

"테이블 버킷 생성" 버튼을 다시 누르면 테이블 버킷이 생성된다.

![2](/blog/assets/20250315/table-buckets.webp)

## Athena를 통한 S3 테이블 생성

다음 단계로 Athena를 사용하여 S3 테이블을 생성할 수 있다. "Athena로 테이블 생성" 버튼을 클릭한다.

![1](/blog/assets/20250315/duckdb-test.webp)


이전에 네임스페이스를 생성했다면, 이를 선택하고 "Athena로 테이블 생성"을 클릭하여 S3 테이블 생성을 계속 진행할 수 있다.

![1](/blog/assets/20250315/create-table-with-athena-namespace.webp)


이전에 네임스페이스를 생성했다면, 이를 선택하고 "Athena로 테이블 생성"을 클릭하여 S3 테이블 생성을 계속 진행할 수 있다.

![1](/blog/assets/20250315/create-table-with-athena.webp)

이 작업은 Athena 콘솔이 열리는 새 탭을 연다.


![1](/blog/assets/20250315/athena-console.webp)


💡
쿼리를 실제로 실행하기 전에 Athena 쿼리 결과 위치를 생성해야 하지만, 이는 이 블로그 게시물의 범위에 포함되지 않는다.

테스트 목적으로 Athena에서 제공하는 예제 테이블 DDL을 사용할 수 있다. CREATE TABLE 문을 선택하고 "실행" 버튼을 클릭한다.

![1](/blog/assets/20250315/create-table.webp)

Iceberg 지원이 있는 새로운 S3 테이블을 성공적으로 생성했다!

## Athena를 통한 테스트 데이터 삽입

나중에 DuckDB에서 데이터를 쿼리하려면 새로 생성한 테이블에 샘플 데이터를 삽입해야 한다. 따라서 CREATE TABLE 문 아래의 INSERT 문을 주석 해제하고 "실행" 버튼을 클릭한다.

![1](/blog/assets/20250315/insert-into-table.webp)

성공하면 다음과 같이 보인다.

![1](/blog/assets/20250315/insert_done.webp)


이제 실제로 DuckDB로 S3 테이블을 쿼리하기 위해 필요한 인프라와 데이터를 구축했다!

## IAM 권한

본격적으로 시작하기 전에 테스트에 사용할 계획인 IAM 역할에 적절한 권한이 있는지 확인해야 한다. 그렇지 않으면 쿼리를 수행할 수 없다.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3tables:*",
                "YOUR OTHER IAM permissions",
            ],
            "Resource": "*"
        }
    ]
}
```

`s3tables:*`이 해당 부분으로, s3tables 서비스에 대한 모든 IAM 작업을 사용할 수 있게 해준다.

앞으로 DuckDB를 사용하여 S3 테이블을 쿼리하려는 위치에서 AWS 자격 증명을 설정 완료 되어있다고 가정한다. 이에 대한 자세한 내용은 포함되지 않지만, [이 문서](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-quickstart.html)를 참고할 수 있다. 


# 최신 DuckDB 버전 사용

시작하기 앞서, DuckDB 버전 1.2.1을 설치했는지 확인하자. 그렇지 않으면 작동하지 않는다!

# 익스텐션 설치

터미널에서 DuckDB를 연다:

```bash
$ duckdb --version
v1.2.1 8e52ec4395

$ duckdb
```

첫 번째 단계는 관련 확장(aws, httpsfs 및 iceberg)을 최신 버전으로 설치하는 것이다:

```sql
FORCE INSTALL aws FROM core_nightly;
FORCE INSTALL httpfs FROM core_nightly;
FORCE INSTALL iceberg FROM core_nightly;
```

# S3 시크릿 생성 

다음 단계로, DuckDB가 자격 증명 체인 제공자를 통해 자동으로 인증할 수 있도록 시크릿을 생성해야 한다.

```sql
CREATE SECRET (
  TYPE s3,
  PROVIDER credential_chain
);
```

# 데이터베이스 연결

다음으로, 실제 원격 데이터베이스를 로컬 DuckDB 인스턴스에 연결해야 한다. ARN이 올바른지 확인하라. 테이블 버킷 세부 정보에서 ARN을 복사할 수 있다.

![1](/blog/assets/20250315/attach_database.webp)

아래에서 ARN을 대체하고 실행한다:

```sql
ATTACH 'arn:aws:s3tables:us-east-1:12345678912:bucket/duckdb-test'
  AS test_db (
    TYPE iceberg,
    ENDPOINT_TYPE s3_tables
);
```

# 테이블 버킷의 네임스페이스에 있는 모든 테이블 표시

아래 명령문을 실행하면 S3 테이블 목록이 표시된다:

```sql
SHOW ALL TABLES;

┌──────────────┬─────────┬─────────────┬─────────────────────────────────────────────┬─────────────────────────┬───────────┐
│   database   │ schema  │    name     │                column_names                 │      column_types       │ temporary │
│   varchar    │ varchar │   varchar   │                  varchar[]                  │        varchar[]        │  boolean  │
├──────────────┼─────────┼─────────────┼─────────────────────────────────────────────┼─────────────────────────┼───────────┤
│ test_db      │ test    │ daily_sales │ [sale_date, product_category, sales_amount] │ [DATE, VARCHAR, DOUBLE] │ false     │
└──────────────┴─────────┴─────────────┴─────────────────────────────────────────────┴─────────────────────────┴───────────┘
```

# S3 테이블 쿼리하기

이제 S3 테이블을 쿼리할 수 있다.

```sql 
select * from test_db.test.daily_sales;
┌────────────┬──────────────────┬──────────────┐
│ sale_date  │ product_category │ sales_amount │
│    date    │     varchar      │    double    │
├────────────┼──────────────────┼──────────────┤
│ 2024-01-15 │ Laptop           │        900.0 │
│ 2024-01-15 │ Monitor          │        250.0 │
│ 2024-01-16 │ Laptop           │       1350.0 │
│ 2024-02-01 │ Monitor          │        300.0 │
│ 2024-02-01 │ Keyboard         │         60.0 │
│ 2024-02-02 │ Mouse            │         25.0 │
│ 2024-02-02 │ Laptop           │       1050.0 │
│ 2024-02-03 │ Laptop           │       1200.0 │
│ 2024-02-03 │ Monitor          │        375.0 │
└────────────┴──────────────────┴──────────────┘
```


## References

- [DuckDB Blog: Amazon S3 Tables in DuckDB](https://duckdb.org/2025/03/14/preview-amazon-s3-tables.html)
- [Add Glue support](https://github.com/duckdb/duckdb-iceberg/pull/98)
- [Add Iceberg Catalog read support](https://github.com/duckdb/duckdb-iceberg/pull/98)

예제 코드가 포함된 테스트는 test_glue.test에서 찾을 수 있다.

- [test_glue.test](https://github.com/duckdb/duckdb-iceberg/blob/main/test/sql/cloud/glue/test_glue.test)

--- 

# DuckDB UI 이용해보기 

