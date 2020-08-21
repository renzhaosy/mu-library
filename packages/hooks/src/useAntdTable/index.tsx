import React, { useState, useEffect, useCallback } from 'react';

interface IData {
  list?: any[];
  total?: number;
}

// 返回执行函数 run  和 loading
function useTableRequest(service, options) {
  const { defaultParams = {}, formatResult } = options;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<null | IData>(null);
  const [params, setParams] = useState(defaultParams || {});

  const run = useCallback(
    (...restRunParams) => {
      setLoading(true);
      // setPagination(runPagination);
      setParams(restRunParams);

      return service(...restRunParams)
        .then((res) => {
          setLoading(false);
          const formattedResult = formatResult ? formatResult(res) : res;
          setData(formattedResult);
          return formattedResult;
        })
        .catch((error) => {
          setLoading(false);
          setData(null);
          throw error;
        });
    },
    [service, formatResult, setLoading, setData]
  );

  const runChangePaination = useCallback(
    (pagination) => {
      // setPagination(pagination);
      const [oldPagination, ...restParams] = params;
      run(
        {
          ...oldPagination,
          ...pagination,
        },
        ...restParams
      );
    },
    [params]
  );

  // 更改

  const handleChangePagination = useCallback(
    (c, p) => {
      runChangePaination({ current: c, pageSize: p });
    },
    [runChangePaination]
  );

  return {
    loading,
    error: undefined,
    tableProps: {
      dataSource: data?.list || [],
      loading,
      pagination: {
        ...params[0],
        total: data?.total || 0,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} items`,
        onChange: handleChangePagination,
        showSizeChanger: true,
      },
    },
    params,
    run,
  };
}

export interface IResult {
  search: {
    submit: () => void;
    reset: () => void;
  };
}

interface IOptions {
  defaultPageSize?: number;
  defaultParams?: object;
  form?: any;
}

function useTable(service, options: IOptions = {}) {
  const { defaultPageSize, defaultParams, form } = options;

  const { params, tableProps, run } = useTableRequest(service, {
    defaultParams: [
      {
        current: 1,
        pageSize: defaultPageSize,
        total: 0,
      },
      defaultParams,
    ],
  });

  const validateFormValues = () => {
    if (!form) {
      return Promise.resolve({});
    } 
    return form.validateFields();
  };

  // 初始化  设置from初始值
  useEffect(() => {
    if (form) {
      // 设置初始值
      form.setFieldsValue(defaultParams);
    }
  }, []);

  // 第一次手动提交
  useEffect(() => {
    _submit(params);
  }, []);

  const _submit = useCallback(
    (initParams?: any) => {
      validateFormValues().then((values) => {
        // 初始化
        if (initParams) {
          run(initParams[0], values);
          return;
        }
        run(
          {
            current: 1,
            pageSize: defaultPageSize || 10,
          },
          values
        );
      });
    },
    [params]
  );

  const submit = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    _submit();
  };

  const reset = useCallback(() => {
    if (form) {
      form.resetFields();
    }
    _submit();
  }, [form, _submit]);

  return {
    tableProps,
    search: {
      submit,
      reset,
    },
  };
}

export default useTable;
