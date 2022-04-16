import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IPaginationProps } from "../../interfaces";
import styles from './styles.module.scss'

interface IPaginationComponentProps {
  pagination: IPaginationProps
  setPagination: Dispatch<SetStateAction<IPaginationProps>>
  refreshList: () => void
}

export const Pagination: React.FC<IPaginationComponentProps> = ({
  pagination,
  setPagination,
  refreshList
}) => {
  const lastPage = Math.ceil(pagination.total / pagination.perPage)
  let nextsCount = 4;

  const [previousPages, setPreviousPages] = useState<number[]>(
    pagination.page > 1 ? generatePagesArray(pagination.page - 1 - nextsCount, pagination.page - 1) : [],
  );

  const [nextPages, setNextPages] = useState<number[]>(
    pagination.page < lastPage ? generatePagesArray(pagination.page, Math.min(pagination.page + nextsCount, lastPage)) : [],
  );

  useEffect(() => {
    if (pagination.page === 2 || pagination.page === pagination.total - 1) {
      nextsCount = 3;
    } else if (pagination.page >= 3 && pagination.page <= pagination.total - 2) {
      nextsCount = 2;
    }

    setPreviousPages(pagination.page > 1 ? generatePagesArray(pagination.page - 1 - nextsCount, pagination.page - 1) : []);

    setNextPages(
      pagination.page < lastPage ? generatePagesArray(pagination.page, Math.min(pagination.page + nextsCount, lastPage)) : [],
    );
  }, [pagination]);

  function generatePagesArray(from: number, to: number) {
    return [...new Array(to - from)]
      .map((_, index) => {
        return from + index + 1;
      })
      .filter((page) => page > 0);
  }

  return (
    <div className={styles.pagination}>
      <div>Quantidade: {pagination.perPage} de {pagination.total}</div>
      <div
        className={styles.buttonsContainer}
      >
        <div
          className={styles.arrowButton}
          onClick={() => {
            if (pagination.page > 1) {
              setPagination({
                ...pagination,
                page: pagination.page - 1
              })

              refreshList()
            }
          }}
        >&#8249;</div>

        {previousPages.length > 0 &&
          previousPages.map(page => {
            return (
              <div
                className={styles.allowedPages}
                key={page}
                onClick={() => {
                  setPagination({
                    ...pagination,
                    page
                  })

                  refreshList()
                }}
              >
                {page}
              </div>
            )
          })
        }

        <div className={styles.currentPage}>
          {pagination.page}
        </div>



        {nextPages.length > 0 &&
          nextPages.map(page => {
            return (
              <div
                className={styles.allowedPages}
                key={page}
                onClick={() => {
                  setPagination({
                    ...pagination,
                    page
                  })

                  refreshList()
                }}
              >
                {page}
              </div>
            )
          })
        }

        <div
          className={styles.arrowButton}
          onClick={() => {
            if (pagination.page < lastPage) {
              setPagination({
                ...pagination,
                page: pagination.page + 1
              })

              refreshList()
            }
          }}
        >&#8250;</div>
      </div>
    </div>
  )
}
