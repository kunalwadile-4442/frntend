export const customerServicePermission = [
    { name: "create", label: "Create", api_list: "searchService:createCombinations,customerService:create,customerService:list,customerService:get,searchService:list", value: false },
    { name: "update", label: "Update", api_list: "searchService:createCombinations,customerService:update,customerService:updateStatus,customerService:list,customerService:get,searchService:list", value: false },
    { name: "delete", label: "Delete", api_list: "searchService:createCombinations,customerService:delete,customerService:list,searchService:list", value: false },
    { name: "list", label: "View Only", api_list: "searchService:createCombinations,customerService:list,customerService:get,searchService:list", value: false },
];
export const backOfficeCustomerServicePermission = [
    { name: "create", label: "Create", api_list: "searchService:createCombinations,backOfficeCustomerService:create,backOfficeCustomerService:list,backOfficeCustomerService:get,searchService:list", value: false },
    { name: "update", label: "Update", api_list: "searchService:createCombinations,backOfficeCustomerService:update,backOfficeCustomerService:updateStatus,backOfficeCustomerService:list,backOfficeCustomerService:get,searchService:list", value: false },
    { name: "delete", label: "Delete", api_list: "searchService:createCombinations,backOfficeCustomerService:delete,backOfficeCustomerService:list,searchService:list", value: false },
    { name: "list", label: "View Only", api_list: "searchService:createCombinations,backOfficeCustomerService:list,backOfficeCustomerService:get,searchService:list", value: false },
];
export const supplierServicePermission = [
    { name: "create", label: "Create", api_list: "searchService:createCombinations,supplierService:create,supplierService:list,supplierService:get,searchService:list", value: false },
    { name: "update", label: "Update", api_list: "searchService:createCombinations,supplierService:update,supplierService:updateStatus,supplierService:list,supplierService:get,searchService:list", value: false },
    { name: "delete", label: "Delete", api_list: "searchService:createCombinations,supplierService:delete,supplierService:list,searchService:list", value: false },
    { name: "list", label: "View Only", api_list: "searchService:createCombinations,supplierService:list,supplierService:get,searchService:list", value: false },
]
export const projectServicePermission = [
    { name: "create", label: "Create", value: false, api_list: "backOfficeProjectService:create,intuitService:terms,searchService:createCombinations,projectService:archive,projectService:recover,projectService:assign,packageService:create,customerService:list,customerService:get,scopeOfWorkService:list,projectTypeService:list,projectScopeService:list,projectService:create,projectService:list,projectService:get,intuitService:items,searchService:list" },
    { name: "update", label: "Update", value: false, api_list: "backOfficeProjectService:create,intuitService:terms,searchService:createCombinations,projectService:archive,projectService:recover,projectService:updateEscalation,packageService:update,packageService:updateStatus,customerService:list,customerService:get,scopeOfWorkService:list,projectTypeService:list,projectScopeService:list,projectService:update,projectService:updateStatus,projectService:updatePricing,projectService:list,projectService:get,intuitService:items,searchService:list" },
    { name: "delete", label: "Delete", value: false, api_list: "searchService:createCombinations,packageService:delete,projectService:delete,drawingService:create,scopeOfWorkService:list,projectTypeService:list,projectScopeService:list,projectService:list,searchService:list" },
    { name: "list", label: "View Only", value: false, api_list: "customerService:list,searchService:createCombinations,shopService:list,shopService:get,packageService:list,projectService:list,projectService:get,scopeOfWorkService:list,projectTypeService:list,projectScopeService:list,searchService:list" },
]
export const backOfficeProjectServicePermission = [
    { name: "create", label: "Create", value: false, api_list: "userService:list,customerService:list,backOfficeProjectService:archive,backOfficeProjectService:recover,backOfficeProjectService:update,backOfficeProjectService:create,intuitService:terms,searchService:createCombinations,backOfficeProjectService:archive,backOfficeProjectService:recover,backOfficeProjectService:assign,packageService:create,customerService:list,drawingService:create,customerService:get,scopeOfWorkService:list,projectTypeService:list,projectScopeService:list,searchService:list,backOfficeProjectService:list,backOfficeProjectService:get,companyManagementService:list" },
    { name: "update", label: "Update", value: false, api_list: "userService:list,customerService:list,backOfficeProjectService:archive,backOfficeProjectService:recover,backOfficeProjectService:update,intuitService:terms,searchService:createCombinations,projectService:archive,projectService:recover,packageService:update,packageService:updateStatus,customerService:list,drawingService:update,customerService:get,scopeOfWorkService:list,projectTypeService:list,projectScopeService:list,backOfficeProjectService:updateStatus,backOfficeProjectService:list,searchService:list,backOfficeProjectService:get" },
    { name: "delete", label: "Delete", value: false, api_list: "userService:list,customerService:list,searchService:createCombinations,packageService:delete,backOfficeProjectService:delete,drawingService:create,scopeOfWorkService:list,projectTypeService:list,projectScopeService:list,backOfficeProjectService:list" },
    { name: "list", label: "View Only", value: false, api_list: "userService:list,customerService:list,customerService:list,searchService:createCombinations,packageService:list,backOfficeProjectService:list,scopeOfWorkService:list,projectTypeService:list,projectScopeService:list,searchService:list,backOfficeProjectService:list" },
]
export const inquiryServicePermission = [
    { name: "create", label: "Create", value: false, api_list: "inquirySaleService:listing,saleService:getTax,saleService:getInvoice,searchService:createCombinations,supplierService:list,supplierService:get,productService:list,inquirySaleService:rollback,emailTemplateService:get,inquiryService:sale,inquirySaleService:pdf,saleService:sendBOL,inquirySaleService:getTaxRate,deliveryByService:list,taxService:list,productUnitService:list,inquirySaleService:create,inquiryService:supplier_list,customerService:list,customerService:get,gradeService:list,inquirySaleService:list,inquirySaleService:get,inquirySaleService:po,inquiryService:create,inquiryService:list,inquiryService:get,inquirySaleService:get,intuitService:terms" },
    { name: "update", label: "Update", value: false, api_list: "inquirySaleService:listing,saleService:getTax,saleService:getInvoice,searchService:createCombinations,supplierService:list,supplierService:get,,productService:list,inquirySaleService:rollback,emailTemplateService:get,inquiryService:recover,inquirySaleService:pdf,saleService:sendBOL,inquirySaleService:getTaxRate,inquirySaleService:update,deliveryByService:list,inquirySaleService:recover,inquiryService:sale,taxService:list,productUnitService:list,inquiryService:supplier_list,inquiryService:supplier,inquiryService:supplier_price,inquiryService:supplier_sale,customerService:get,customerService:list,customerService:get,gradeService:list,inquirySaleService:list,inquirySaleService:get,inquirySaleService:accept,inquirySaleService:po,inquirySaleService:schedule,inquirySaleService:deliver,inquirySaleService:schedulePadlet,inquiryService:update,inquiryService:updateStatus,inquiryService:list,inquiryService:get,inquirySaleService:get,intuitService:terms" },
    { name: "delete", label: "Delete", value: false, api_list: "inquirySaleService:listing,searchService:createCombinations,supplierService:list,supplierService:get,inquiryService:archive,customerService:list,gradeService:list,inquirySaleService:list,inquiryService:delete,inquirySaleService:reject,inquirySaleService:archive,inquiryService:list" },
    { name: "list", label: "View Only", value: false, api_list: "inquirySaleService:listing,customerService:list,searchService:createCombinations,supplierService:list,supplierService:get,inquiryService:list,inquiryService:supplier_list,inquiryService:get,inquirySaleService:list,inquirySaleService:get,searchService:list,supplierService:list" },
]

export const inquiryServiceDeliveredPermission = [
    { name: "create", label: "Create", value: false, api_list: "" },
    { name: "update", label: "Update", value: false, api_list: "inquirySaleService:list,inquirySaleService:delivered,saleService:getTax,saleService:getInvoice,searchService:createCombinations,saleService:editInvoice,inquirySaleService:getTaxRate,deliveryByService:list,taxService:list,customerService:list,intuitService:terms,inquirySaleService:get" },
    { name: "delete", label: "Delete", value: false, api_list: "" },
    { name: "list", label: "View Only", value: false, api_list: "inquirySaleService:delivered,saleService:getTax,saleService:getInvoice,searchService:createCombinations,inquirySaleService:getTaxRate,deliveryByService:list,taxService:list,customerService:list,intuitService:terms,inquirySaleService:get,inquirySaleService:list" },
]

export const saleOrderPermission = [
    { name: "create", label: "Create", value: false, api_list: "searchService:createCombinations,supplierService:list,productUnitService:list,customerService:list,saleOrderService:create,saleOrderService:accept,saleOrderService:reject,saleOrderService:recover,saleOrderService:pdf" },
    { name: "update", label: "Update", value: false, api_list: "searchService:createCombinations,supplierService:list,productUnitService:list,customerService:list,saleOrderService:update,saleOrderService:get,saleOrderService:reject,saleOrderService:archive,saleOrderService:recover,saleOrderService:pdf" },
    { name: "delete", label: "Delete", value: false, api_list: "" },
    { name: "list", label: "View Only", value: false, api_list: "searchService:createCombinations,saleOrderService:list" },
]
export const purchaseOrderPermission = [
    { name: "create", label: "Create", value: false, api_list: "searchService:createCombinations,supplierService:list,productUnitService:list,customerService:list,purchaseOrderService:create,purchaseOrderService:accept,purchaseOrderService:reject,purchaseOrderService:recover,purchaseOrderService:pdf,purchaseOrderService:list" },
    { name: "update", label: "Update", value: false, api_list: "searchService:createCombinations,supplierService:list,productUnitService:list,customerService:list,purchaseOrderService:update,purchaseOrderService:get,purchaseOrderService:reject,purchaseOrderService:archive,purchaseOrderService:recover,purchaseOrderService:pdf,purchaseOrderService:list" },
    { name: "delete", label: "Delete", value: false, api_list: "" },
    { name: "list", label: "View Only", value: false, api_list: "searchService:createCombinations,purchaseOrderService:list" },
]
export const editInventoryPermission = [
    { name: "create", label: "Create", value: false,},
    { name: "update", label: "Update", value: false, api_list: "productService:list,locationFacilityService:list,gradeService:list,coatingService:list,sizeSpecificationService:list,supplierService:list,supplierTypeService:list,productLengthService:list,inventoryService:create,productLengthService:list,inventoryService:search,searchService:list,inventoryService:edit" },
    { name: "delete", label: "Delete", value: false,},
    { name: "list", label: "View Only", value: false,},
]

export const logisticServicePermission = [
    { name: "create", label: "Create", value: false, },
    { name: "update", label: "Update", value: false, },
    { name: "delete", label: "Delete", value: false, },
    { name: "list", label: "View Only", value: false, api_list: "searchService:createCombinations,logisticService:list,logisticService:get,deliveryByService:list,logisticService:location" },
]
export const inventoryServicePermission = [
    { name: "create", label: "Create", value: false, api_list: "searchService:createCombinations,inventoryTransferService:createChild,inventoryTransferService:history,productService:list,locationFacilityService:list,gradeService:list,coatingService:list,sizeSpecificationService:list,supplierService:list,supplierTypeService:list,productLengthService:list,inventoryService:create,productLengthService:list,inventoryService:get" },
    { name: "update", label: "Update", value: false, api_list: "searchService:createCombinations,inventoryTransferService:editChild,inventoryTransferService:history,productService:list,locationFacilityService:list,gradeService:list,coatingService:list,sizeSpecificationService:list,supplierService:list,supplierTypeService:list,productLengthService:list,inventoryService:update,inventoryService:updateStatus,inventoryService:get" },
    { name: "delete", label: "Delete", value: false, api_list: "searchService:createCombinations,inventoryTransferService:history,productService:list,locationFacilityService:list,gradeService:list,coatingService:list,sizeSpecificationService:list,supplierService:list,supplierTypeService:list,productLengthService:list,inventoryService:delete" },
    { name: "list", label: "View Only", value: false, api_list: "gradeService:list,searchService:createCombinations,inventoryTransferService:history,productService:list,locationFacilityService:list,gradeService:list,coatingService:list,sizeSpecificationService:list,supplierService:list,supplierTypeService:list,productLengthService:list,inventoryService:list,inventoryService:stock,inventoryService:get" },
]
export const proposalServicePermission = [
    { name: "create", label: "Create", api_list: "searchService:createCombinations,projectScopeService:list,projectScopeService:get,proposalService:create,proposalService:list,proposalService:get,proposalService:sent,proposalService:accept,proposalService:upload,searchService:list", value: false },
    { name: "update", label: "Update", api_list: "searchService:createCombinations,projectScopeService:list,projectScopeService:get,proposalService:recover,proposalService:update,proposalService:updateStatus,proposalService:list,proposalService:get,proposalService:sent,searchService:list", value: false },
    { name: "delete", label: "Delete", api_list: "searchService:createCombinations,projectScopeService:list,projectScopeService:get,proposalService:delete,proposalService:list,proposalService:reject,searchService:list", value: false },
    { name: "list", label: "View Only", api_list: "customerService:list,searchService:createCombinations,projectScopeService:list,projectScopeService:get,proposalService:list,proposalService:get,scopeOfWorkService:list,proposalService:archive,searchService:list", value: false },
]
export const projectManagementPermission = [
    { name: "create", label: "Create", value: false, api_list: "ChatMessageService:joinGroup,checklistService:list,changeOrderService:getChangeOrderNumber,userService:list,listLogService:getNextCount,drawingComplexityService:list,backOfficeProjectService:list,drawingService:create,drawingService:updateDate,packageService:list,drawingStatusService:list,ChatMessageService:getMessages,ChatMessageService:sendAllMessage,ChatMessageService:joinGroups,drawingService:assignDrawing,ChatMessageService:getAllGroupsForUser,ChatGroupService:getGroup,ChatMessageService:getProjectChatMessages,drawingVersionHistoryService:create,drawingVersionHistoryService:list,drawingVersionHistoryService:get,drawingVersionService:create,drawingVersionService:list,drawingVersionService:get,revisionHistoryService:create,changeOrderService:create,revisionHistoryService:list,revisionHistoryService:get,listLogService:create,locationFacilityService:list,packageService:get,productService:list,gradeService:list,coatingService:list,sizeSpecificationService:list,supplierService:list,supplierTypeService:list,productLengthService:list,inventoryService:create,productLengthService:list,inventoryService:get,searchService:list,backOfficeProjectService:get,drawingService:list" },
    { name: "update", label: "Update", value: false, api_list: "ChatMessageService:joinGroup,checklistService:list,changeOrderService:approved,changeOrderService:archive,changeOrderService:revisions,userService:list,listLogService:get,drawingComplexityService:list,backOfficeProjectService:list,drawingService:updateDate,packageService:list,drawingStatusService:list,ChatMessageService:getMessages,ChatMessageService:sendAllMessage,ChatMessageService:joinGroups,drawingService:assignDrawing,ChatMessageService:getAllGroupsForUser,ChatGroupService:getGroup,ChatMessageService:getProjectChatMessages,drawingVersionHistoryService:update,drawingVersionHistoryService:list,drawingVersionHistoryService:get,drawingVersionService:update,drawingVersionService:list,drawingVersionService:get,revisionHistoryService:update,changeOrderService:update,revisionHistoryService:list,revisionHistoryService:get,listLogService:update,changeOrderService:updateStatus,listLogService:updateStatus,locationFacilityService:list,packageService:get,productService:list,gradeService:list,coatingService:list,sizeSpecificationService:list,supplierService:list,supplierTypeService:list,productLengthService:list,inventoryService:update,inventoryService:updateStatus,inventoryService:get,searchService:list,backOfficeProjectService:get,drawingService:list" },
    { name: "delete", label: "Delete", value: false, api_list: "ChatMessageService:joinGroup,listLogService:delete,backOfficeProjectService:list,revisionHistoryService:delete,drawingService:delete,packageService:list,drawingService:list" },
    { name: "list", label: "View Only", value: false, api_list: "ChatMessageService:joinGroup,backOfficeProjectService:list,ChatMessageService:getMessages,ChatMessageService:sendAllMessage,ChatMessageService:joinGroups,ChatMessageService:getAllGroupsForUser,ChatGroupService:getGroup,ChatMessageService:getProjectChatMessages,drawingVersionHistoryService:list,drawingVersionHistoryService:get,drawingVersionService:list,drawingVersionService:get,changeOrderService:list,revisionHistoryService:list,revisionHistoryService:get,listLogService:list,locationFacilityService:list,productService:list,packageService:get,packageService:list,gradeService:list,coatingService:list,sizeSpecificationService:list,supplierService:list,supplierTypeService:list,productLengthService:list,inventoryService:list,inventoryService:stock,inventoryService:get,userService:list,searchService:list,backOfficeProjectService:get" },
]

export const webMailPermission = [
    { name: "create", label: "Create", value: false, api_list: "gmailService:get,gmailService:readBy,gmailService:list,revisionHistoryService:create,backOfficeProjectService:list,packageService:list" },
    { name: "update", label: "Update", value: false, api_list: "" },
    { name: "delete", label: "Delete", value: false, api_list: "" },
    { name: "list", label: "View Only", value: false, api_list: "gmailService:get,gmailService:list,gmailService:readBy" },
]

export const timeReportPermission = [
    { name: "create", label: "Create", value: false, api_list: "" },
    { name: "update", label: "Update", value: false, api_list: "" },
    { name: "delete", label: "Delete", value: false, api_list: "" },
    { name: "list", label: "View Only", value: false, api_list: "timeManagementService:list,backOfficeProjectService:list,drawingService:list,packageService:list" },
]


export const chatPermission = [
    { name: "create", label: "Create", value: false, api_list: "ChatMessageService:getProjectChatMessages,ChatMessageService:getAllGroupsForUser,ChatGroupService:getGroup,ChatMessageService:markMessagesAsRead,chatService:create,searchService:list,searchService:createCombinations,ChatMessageService:sendAllMessage,ChatMessageService:getSingleMessages,ChatMessageService:getGroupChatMessages,ChatMessageService:getMessages,ChatMessageService:getProjectTypesForUser,ChatMessageService:getGroupChatMessages,ChatGroupService:createOrUpdateGroupChat,ChatMessageService:listing,ChatMessageService:joinGroups,ChatGroupService:createOrUpdateProjectChatGroup,ChatGroupService:getGroup,chatService:create,searchService:list,searchService:createCombinations,ChatMessageService:sendAllMessage,ChatMessageService:getSingleMessages,ChatMessageService:getGroupChatMessages,ChatMessageService:getMessages,ChatMessageService:getProjectTypesForUser,ChatMessageService:getGroupChatMessages,ChatGroupService:createOrUpdateGroupChat,ChatGroupService:addUser,ChatMessageService:getProjectChatMessages,ChatMessageService:getAllGroupsForUser,ChatGroupService:getGroup,ChatMessageService:markMessagesAsRead,chatService:create,searchService:list,searchService:createCombinations,ChatMessageService:sendAllMessage,ChatMessageService:getSingleMessages,ChatMessageService:getGroupChatMessages,ChatMessageService:getMessages,ChatMessageService:getProjectTypesForUser,ChatMessageService:getGroupChatMessages,ChatGroupService:createOrUpdateGroupChat,ChatMessageService:listing,ChatMessageService:joinGroups,ChatGroupService:createOrUpdateProjectChatGroup,ChatGroupService:getGroup" },
    { name: "update", label: "Update", value: false, api_list: "ChatGroupService:changeGroupLogo,ChatGroupService:updateGroupName,ChatMessageService:getProjectChatMessages,ChatMessageService:getAllGroupsForUser,ChatGroupService:getGroup,ChatMessageService:markMessagesAsRead,chatService:update,searchService:list,searchService:createCombinations,ChatMessageService:getSingleMessages,ChatMessageService:getGroupChatMessages,ChatMessageService:getMessages,ChatMessageService:getProjectTypesForUser,ChatMessageService:getGroupChatMessages,ChatGroupService:createOrUpdateGroupChat,ChatMessageService:listing,ChatMessageService:joinGroups,ChatGroupService:createOrUpdateProjectChatGroup,ChatGroupService:getGroup,chatService:update,searchService:list,searchService:createCombinations,ChatMessageService:getSingleMessages,ChatMessageService:getMessages,ChatGroupService:addUser" },
    { name: "delete", label: "Delete", value: false, api_list: "ChatGroupService:removeUser,ChatMessageService:getProjectChatMessages,ChatMessageService:getAllGroupsForUser,ChatGroupService:getGroup,ChatMessageService:markMessagesAsRead,chatService:dalete,ChatMessageService:getSingleMessages,ChatMessageService:getGroupChatMessages,ChatMessageService:getMessages,ChatMessageService:listing,ChatMessageService:joinGroups,ChatGroupService:getGroup,chatService:dalete,ChatMessageService:getSingleMessages" },
    { name: "list", label: "View Only", value: false, api_list: "ChatMessageService:getProjectChatMessages,ChatMessageService:getAllGroupsForUser,ChatGroupService:getGroup,ChatMessageService:markMessagesAsRead,chatService:list,ChatMessageService:getSingleMessages,ChatMessageService:getGroupChatMessages,ChatMessageService:getMessages,ChatGroupService:getGroup,chatService:list,ChatMessageService:getSingleMessages,ChatMessageService:getProjectChatMessages,ChatMessageService:getAllGroupsForUser,ChatGroupService:getGroup,ChatMessageService:markMessagesAsRead,chatService:create,searchService:list,searchService:createCombinations,ChatMessageService:sendAllMessage,ChatMessageService:getSingleMessages,ChatMessageService:getGroupChatMessages,ChatMessageService:getMessages,ChatMessageService:getProjectTypesForUser,ChatMessageService:getGroupChatMessages,ChatGroupService:createOrUpdateGroupChat,ChatMessageService:listing,ChatMessageService:joinGroups,ChatGroupService:createOrUpdateProjectChatGroup,ChatGroupService:getGroup" },
]

export const stockTransferServicePermission = [
    { name: "create", label: "Create", value: false, api_list: "inventoryTransferService:deleteChild,inventoryTransferService:getPickupNumber,inventoryTransferService:checkPickupNumber,inventoryTransferService:editChild,searchService:createCombinations,inventoryTransferService:book,inventoryTransferService:child,inventoryTransferService:history,inventoryTransferService:upload,productLengthService:get,coatingService:get,productService:get,sizeSpecificationService:get,intuitService:get,gradeService:get,deliveryByService:get,locationFacilityService:get,productUnitService:get,productUnitService:list,productLengthService:list,coatingService:list,productService:list,sizeSpecificationService:list,intuitService:list,gradeService:list,deliveryByService:list,locationFacilityService:list,inventoryTransferService:list,inventoryTransferService:create,inventoryService:stock,productLengthService:list" },
    { name: "update", label: "Update", value: false, api_list: "inventoryTransferService:deleteChild,inventoryTransferService:getPickupNumber,inventoryTransferService:checkPickupNumber,searchService:createCombinations,inventoryTransferService:book,inventoryTransferService:edit,inventoryTransferService:history,inventoryTransferService:upload,productLengthService:get,coatingService:get,productService:get,sizeSpecificationService:get,intuitService:get,gradeService:get,deliveryByService:get,locationFacilityService:get,productUnitService:get,productUnitService:list,productLengthService:list,coatingService:list,productService:list,sizeSpecificationService:list,intuitService:list,gradeService:list,deliveryByService:list,locationFacilityService:list,inventoryTransferService:list,inventoryTransferService:update,inventoryTransferService:get,inventoryService:stock,productLengthService:list" },
    { name: "delete", label: "Delete", value: false, api_list: "searchService:createCombinations,inventoryTransferService:history,inventoryTransferService:list,inventoryTransferService:delete,inventoryTransferService:get,locationFacilityService:list" },
    { name: "list", label: "View Only", value: false, api_list: "searchService:createCombinations,inventoryTransferService:history,inventoryTransferService:list,inventoryTransferService:get,locationFacilityService:list" },
]
export const shopSupplyPermission = [
    { name: "create", label: "Create", value: false, api_list: "shopService:listing,saleService:getTax,searchService:createCombinations,deliveryByService:list,projectService:list,projectService:get,shopService:create,shopService:list,shopService:get,shopScheduleService:schedule,shopScheduleService:deliver,shopScheduleService:rollback,customerService:list,customerService:get,productService:list,productService:get,projectService:list,projectService:get,productLengthService:list,gradeService:list,gradeService:get,coatingService:list,coatingService:get,sizeSpecificationService:list,sizeSpecificationService:get,locationFacilityService:list,locationFacilityService:get,inventoryService:stock"},
    { name: "update", label: "Update", value: false, api_list: "shopService:listing,shopScheduleService:getInvoice,saleService:getTax,searchService:createCombinations,deliveryByService:list,productService:list,projectService:list,projectService:get,shopService:update,shopService:list,shopService:get,shopScheduleService:schedule,shopScheduleService:deliver,shopScheduleService:rollback,customerService:list,customerService:get,productService:list,productService:get,projectService:list,projectService:get,productLengthService:list,gradeService:list,gradeService:get,coatingService:list,coatingService:get,sizeSpecificationService:list,sizeSpecificationService:get,locationFacilityService:list,locationFacilityService:get,inventoryService:stock"},
    { name: "delete", label: "Delete", value: false, api_list: "shopService:listing,searchService:createCombinations,shopService:delete,shopService:list,shopService:get" },
    { name: "list", label: "View Only", value: false, api_list: "shopService:listing,searchService:createCombinations,shopService:list,shopService:get,customerService:list,projectService:list" },
]


export const shopSupplyDeliveredPermission = [
    { name: "create", label: "Create", value: false, api_list: ""},
    { name: "update", label: "Update", value: false, api_list: "shopService:list,shopService:delivered,saleService:getTax,shopScheduleService:getInvoice,searchService:createCombinations,deliveryByService:list,shopScheduleService:editInvoice,projectService:get,shopService:get,customerService:list"},
    { name: "delete", label: "Delete", value: false, api_list: "" },
    { name: "list", label: "View Only", value: false, api_list: "shopService:delivered,searchService:createCombinations,shopService:list,shopService:get,customerService:list,projectService:list" },
]

export const incomingInvoice = [
    { name: "create", label: "Create", value: false, api_list: "inventoryService:incoming_list,incomingInvoiceService:list,incomingInvoiceService:readBy,incomingInvoiceService:accepted,incomingInvoiceService:approved,incomingInvoiceService:trash,incomingInvoiceService:recover,incomingInvoiceService:get,inquirySaleService:list,inventoryService:stock,inventoryService:list,logisticService:list,inventoryTransferService:history,inquirySaleService:get"},
    { name: "update", label: "Update", value: false, api_list: ""},
    { name: "delete", label: "Delete", value: false, api_list: "" },
    { name: "list", label: "View Only", value: false, api_list: "userService:list,incomingInvoiceService:get,incomingInvoiceService:list,incomingInvoiceService:readBy" },
]

export const dashboardPermission = [
    { name: "list", label: "Create", value: false, api_list: "frontDashboardService:get,frontDashboardService:getInventory,frontDashboardService:getSales,inventoryService:stock,logisticService:list" },
]

export const backOfficeDashboardPermission = [
    { name: "create", label: "Create", value: false, api_list: "timeManagementService:timer,timeManagementService:currentTimer" },
    { name: "update", label: "Update", value: false, api_list: "" },
    { name: "delete", label: "Delete", value: false, api_list: "" },
    { name: "list", label: "View Only", value: false, api_list: "backDashboardService:get" },
]

export const submissionPermission = [
    { name: "create", label: "Create", value: false, api_list: "listLogService:submission,backOfficeProjectService:list,submissionService:getRevision,submissionService:create,submissionService:get,drawingService:list,backOfficeProjectService:list,backOfficeProjectService:get" },
    { name: "update", label: "Update", value: false, api_list: "backOfficeProjectService:list,submissionService:getRevision,submissionService:create,submissionService:get,drawingService:list,backOfficeProjectService:list,backOfficeProjectService:get" },
    { name: "delete", label: "Delete", value: false, api_list: "submissionService:create,submissionService:get,drawingService:list,backOfficeProjectService:list,backOfficeProjectService:get" },
    { name: "list", label: "View Only", value: false, api_list: "submissionService:create,submissionService:get,drawingService:list,backOfficeProjectService:list,backOfficeProjectService:get" },
]

export const editInvoicePermission = [
    { name: "create", label: "Create", value: false, api_list: "" },
    { name: "update", label: "Update", value: false, api_list: "searchService:createCombinations,editInvoiceService:distribution,editInvoiceService:shopSupply,shopScheduleService:getInvoice,customerService:list,productService:list,intuitService:terms,projectService:list,productLengthService:list,gradeService:list,coatingService:list,sizeSpecificationService:list,locationFacilityService:list,emailTemplateService:get,projectService:get,saleService:getTax,inventoryService:stock,supplierService:list,productUnitService:list,saleService:getInvoice" },
    { name: "delete", label: "Delete", value: false, api_list: "" },
    { name: "list", label: "View Only", value: false, api_list: "" },
]

export const reportsPermission = [
    { name: "create", label: "Create", value: false, },
    { name: "update", label: "Update", value: false, },
    { name: "delete", label: "Delete", value: false, },
    { name: "list", label: "View Only", value: false, api_list: "frontReportService:purchase,inventoryService:stock,searchService:createCombinations,reportService:list,purchaseOrderService:list,saleOrderService:list,frontReportService:collection,frontReportService:inventory,frontReportService:aging,frontReportService:pdfAgingReport,frontReportService:sendAgingReport,supplierService:list,customerService:list,inquirySaleService:list,shopService:list,shopService:get" },
]

export const FrontOfficeRolePermissions = [
    {
        name: "Front Office Dashboard",
        type: "frontDashboardService",
        permissions: dashboardPermission,
        user_type: "front-office",
    },


    {
        name: "Supplier",
        type: "supplierService",
        permissions: supplierServicePermission,
        user_type: "front-office",
    },
    {
        name: "Projects",
        type: "projectService",
        permissions: projectServicePermission,
        user_type: "front-office",
    },
    {
        name: "Distribution",
        type: "inquiryService",
        permissions: inquiryServicePermission,
        user_type: "front-office",
    },
    {
        name: "Distribution Delivered",
        type: "inquiryService",
        permissions: inquiryServiceDeliveredPermission,
        user_type: "front-office",
    },
    {
        name: "Shop Supply",
        type: "shopService",
        permissions: shopSupplyPermission,
        user_type: "front-office",
    },
    {
        name: "Shop Supply Delivered",
        type: "shopService",
        permissions: shopSupplyDeliveredPermission,
        user_type: "front-office",
    },
    {
        name: "Sale Order",
        type: "saleOrderService",
        permissions: saleOrderPermission,
        user_type: "front-office",
    },
    {
        name: "Purchase Order",
        type: "purchaseOrderService",
        permissions: purchaseOrderPermission,
        user_type: "front-office",
    },
    {
        name: "Logistic",
        type: "logisticService",
        permissions: logisticServicePermission,
        user_type: "front-office",
    },
    {
        name: "Inventory",
        type: "inventoryService",
        permissions: inventoryServicePermission,
        user_type: "front-office",
    },
    {
        name: "Edit Inventory",
        type: "inventoryService",
        permissions: editInventoryPermission,
        user_type: "front-office",
    },
    {
        name: "Stock Transfer",
        type: "inventoryTransferService",
        permissions: stockTransferServicePermission,
        user_type: "front-office",
    },
    {
        name: "Proposal",
        type: "proposalService",
        permissions: proposalServicePermission,
        user_type: "front-office",
    },
    {
        name: "Reports",
        type: "reportsService",
        permissions: reportsPermission,
        user_type: "front-office",
    },
    {
        name: "Incoming Invoice",
        type: "incomingInvoiceService",
        permissions: incomingInvoice,
        user_type: "front-office",
    },
    {
        name:"Edit Invoice",
        type:"editInvoiceService",
        permissions:editInvoicePermission,
        user_type:"front-office"
    },
    {
        name: "Front Office Customers",
        type: "customerService",
        permissions: customerServicePermission,
        user_type: "front-office",
    },
    {
        name: "Back Office Dashboard",
        type: "backDashboardService",
        permissions: backOfficeDashboardPermission,
        user_type: "back-office",
    },
    {
        name: "Back Office Customers",
        type: "backOfficeCustomerService",
        permissions: backOfficeCustomerServicePermission,
        user_type: "back-office",
    },
    {
        name: "Back Office Project",
        type: "backOfficeProjectService",
        permissions: backOfficeProjectServicePermission,
        user_type: "front-office",
    },
    {
        name: "Time Management",
        type: "backOfficeProjectService",
        permissions: timeReportPermission,
        user_type: "front-office",
    },
    {
        name: "Project Management",
        type: "projectService",
        permissions: projectManagementPermission,
        user_type: "front-office",
    },
    {
        name: "Chat",
        type: "chatService",
        permissions: chatPermission,
        user_type: "front-office",
    },
    {
        name:"Web Mail",
        type:"gmailService",
        permissions:webMailPermission,
        user_type:"front-office"
    },
    {
        name:"Submission",
        type:"submissionService",
        permissions:submissionPermission,
        user_type:"front-office"
    },


];

export const BackOfficeRolePermission = [
    {
        name: "Customers",
        type: "customerService",
        permissions: [
            { name: "create", label: "Create", api_list: "customerService:create,customerService:list,customerService:get", value: false },
            { name: "update", label: "Update", api_list: "customerService:update,customerService:updateStatus,customerService:list,customerService:get", value: false },
            { name: "delete", label: "Delete", api_list: "customerService:delete,customerService:list", value: false },
            { name: "list", label: "View Only", api_list: "customerService:list,customerService:get", value: false },
        ],
        status: false,
    },
    {
        name: "Projects",
        type: "projectService",
        permissions: [
            { name: "create", label: "Create", value: false, api_list: "customerService:list,customerService:get,scopeOfWorkService:list,projectTypeService:list,projectScopeService:list,projectService:create,projectService:list,projectService:get," },
            { name: "update", label: "Update", value: false, api_list: "customerService:list,customerService:get,scopeOfWorkService:list,projectTypeService:list,projectScopeService:list,projectService:update,projectService:updateStatus,projectService:updatePricing,projectService:list,projectService:get" },
            { name: "delete", label: "Delete", value: false, api_list: "projectService:delete,scopeOfWorkService:list,projectTypeService:list,projectScopeService:list,projectService:list" },
            { name: "list", label: "View Only", value: false, api_list: "projectService:list,projectService:get,scopeOfWorkService:list,projectTypeService:list,projectScopeService:list" },
        ],
        status: false,
    },

]