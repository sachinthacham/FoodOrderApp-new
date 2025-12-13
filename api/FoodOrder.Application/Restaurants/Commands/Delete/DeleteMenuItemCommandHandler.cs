using ErrorOr;
using MediatR;
using FoodOrder.Application.common.Interfaces.Persistence;
using FoodOrder.Domain.Common.Errors;

namespace FoodOrder.Application.Restaurants.Commands.Delete;

public class DeleteMenuItemCommandHandler : IRequestHandler<DeleteMenuItemCommand, ErrorOr<Deleted>>
{
    private readonly IMenuItemRepository _menuItemRepository;

    public DeleteMenuItemCommandHandler(IMenuItemRepository menuItemRepository)
    {
        _menuItemRepository = menuItemRepository;
    }

    public async Task<ErrorOr<Deleted>> Handle(DeleteMenuItemCommand request, CancellationToken cancellationToken)
    {
        var menuItem = await _menuItemRepository.GetByIdAsync(request.Id);
        if (menuItem is null)
        {
            return Errors.MenuItem.NotFound;
        }

        await _menuItemRepository.DeleteAsync(menuItem);
        return new Deleted();
    }
}

